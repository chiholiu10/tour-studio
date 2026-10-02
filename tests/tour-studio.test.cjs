require("./helpers/register-typescript.cjs");
const { test } = require("node:test");
const assert = require("node:assert/strict");
const {
  parseBrief,
  parseDraft,
  initialBrief,
  estimatedSeconds,
  exportName,
} = require("../src/features/tour-studio/tour-model.ts");
const { createExample } = require("../src/features/tour-studio/example-drafts.ts");
const {
  checkOrigin,
  requireAccess,
  readJson,
  createBudget,
} = require("../src/features/tour-studio/server/request-utils.ts");
const { generateDraft, generateSpeech } = require("../src/features/tour-studio/server/ai-providers.ts");
const draftRoute = require("../src/app/api/studio/draft/route.ts");
const speechRoute = require("../src/app/api/studio/speech/route.ts");

function request(body, origin = "http://localhost:3100") {
  return new Request("http://localhost:3100/api/studio/draft", {
    method: "POST",
    headers: { origin, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("brief validation rejects invalid enums, oversized input and inherited keys", () => {
  assert.deepEqual(parseBrief(initialBrief), initialBrief);
  for (const patch of [
    { location: "toString" },
    { tone: "loud" },
    { duration: "999" },
    { direction: "a".repeat(1201) },
  ]) {
    assert.throws(() => parseBrief({ ...initialBrief, ...patch }));
  }
});

test("examples match their location and approximate requested duration, and disclose their origin", () => {
  for (const location of ["canals", "jordaan", "museum"]) {
    for (const duration of ["30", "60", "90"]) {
      const draft = createExample({ ...initialBrief, location, duration, direction: "Secret ignored direction" });
      assert.equal(parseDraft(draft).source, "example");
      assert.ok(Math.abs(estimatedSeconds(draft.script) - Number(duration)) < 20);
      assert.ok(!draft.script.includes("Secret ignored direction"));
      assert.match(draft.note, /not an AI response/);
    }
  }
});

test("invalid provider output and unsafe export names are bounded", () => {
  assert.throws(() => parseDraft({ title: "hello", script: "", note: "", source: "ai" }));
  assert.throws(() => parseDraft({ title: "hello", script: "a".repeat(3001), note: "", source: "ai" }));
  assert.equal(exportName("../../A Canal <script>"), "a-canal-script");
  assert.equal(exportName("***"), "tour-script");
});

test("paid endpoints require same origin and a valid workspace code", () => {
  assert.throws(() => checkOrigin(request({}, "https://evil.example")), { status: 403 });
  const hostRequest = request({});
  hostRequest.headers.set("host", "localhost:3100");
  assert.doesNotThrow(() => checkOrigin(hostRequest));
  assert.throws(() => requireAccess(request({}), undefined), { status: 503 });
  assert.throws(() => requireAccess(request({}), "test-code"), { status: 401 });
  const authorized = request({});
  authorized.headers.set("authorization", "Bearer test-code");
  assert.doesNotThrow(() => requireAccess(authorized, "test-code"));
});

test("request parsing limits actual bytes and rejects malformed JSON", async () => {
  await assert.rejects(readJson(request({ text: "a".repeat(100) }), 20), { status: 413 });
  const invalid = new Request("http://localhost/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{",
  });
  await assert.rejects(readJson(invalid), { status: 400 });
});

test("generation budget limits concurrency and calls, with idempotent release", () => {
  const reserve = createBudget(2, 100, 1);
  const now = Date.now();
  const release = reserve(now);
  assert.throws(() => reserve(now), { status: 429 });
  release();
  release();
  reserve(now)();
  assert.throws(() => reserve(now), { status: 429 });
  assert.doesNotThrow(() => reserve(now + 101)());
});

test("OpenAI adapter sends bounded structured input without storing responses", async () => {
  let payload;
  const draft = { title: "A place", script: "Pause by the canal.", note: "Check your surroundings." };
  const result = await generateDraft(
    initialBrief,
    { openaiKey: "test-key" },
    new AbortController().signal,
    async (url, options) => {
      assert.equal(url, "https://api.openai.com/v1/responses");
      payload = JSON.parse(options.body);
      assert.equal(options.headers.Authorization, "Bearer test-key");
      return Response.json({
        status: "completed",
        output: [{ type: "message", content: [{ type: "output_text", text: JSON.stringify(draft) }] }],
      });
    },
  );
  assert.equal(payload.store, false);
  assert.equal(payload.text.format.strict, true);
  assert.equal(result.source, "ai");
  assert.equal(result.script, draft.script);
});

test("OpenAI incomplete output, refusal and upstream failures produce safe errors", async () => {
  const signal = new AbortController().signal;
  await assert.rejects(
    generateDraft(initialBrief, {}, signal, async () => Response.json({ status: "incomplete", output: [] })),
    { status: 502 },
  );
  await assert.rejects(
    generateDraft(initialBrief, {}, signal, async () =>
      Response.json({ status: "completed", output: [{ type: "message", content: [{ type: "refusal" }] }] }),
    ),
    { status: 422 },
  );
  await assert.rejects(
    generateDraft(initialBrief, {}, signal, async () => Response.json({ secret: "do not leak" }, { status: 429 })),
    { status: 429 },
  );
});

test("ElevenLabs adapter sends only reviewed text and receives MP3 bytes", async () => {
  const result = await generateSpeech(
    "A reviewed script",
    { elevenLabsKey: "test-key", voiceId: "my_voice" },
    new AbortController().signal,
    async (url, options) => {
      assert.match(url, /\/my_voice\?output_format=mp3_44100_128$/);
      assert.equal(options.headers["xi-api-key"], "test-key");
      assert.equal(JSON.parse(options.body).text, "A reviewed script");
      return new Response(new Uint8Array([73, 68, 51]), { headers: { "Content-Type": "audio/mpeg" } });
    },
  );
  assert.equal(result.byteLength, 3);
});

test("ElevenLabs adapter rejects invalid voices, JSON masquerading as audio and empty files", async () => {
  const signal = new AbortController().signal;
  await assert.rejects(generateSpeech("hello", { voiceId: "../bad" }, signal), { status: 503 });
  await assert.rejects(
    generateSpeech("hello", { voiceId: "ok" }, signal, async () => Response.json({ error: "bad" })),
    { status: 502 },
  );
  await assert.rejects(
    generateSpeech(
      "hello",
      { voiceId: "ok" },
      signal,
      async () => new Response(new Uint8Array(), { headers: { "Content-Type": "audio/mpeg" } }),
    ),
    { status: 502 },
  );
});

test("unconfigured routes return examples, reject foreign origins and never call paid providers", async () => {
  const keys = ["OPENAI_API_KEY", "ELEVENLABS_API_KEY", "STUDIO_ACCESS_TOKEN"];
  const previous = keys.map((key) => process.env[key]);
  const originalFetch = global.fetch;
  keys.forEach((key) => delete process.env[key]);
  global.fetch = async () => {
    throw new Error("Unexpected paid call");
  };
  try {
    const response = await draftRoute.POST(request(initialBrief));
    assert.equal(response.status, 200);
    assert.equal((await response.json()).source, "example");
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.equal((await draftRoute.POST(request(initialBrief, "https://evil.example"))).status, 403);
    assert.equal((await draftRoute.POST(request({ ...initialBrief, duration: "999" }))).status, 400);
    assert.equal((await speechRoute.POST(request({ text: "hello" }))).status, 503);
  } finally {
    global.fetch = originalFetch;
    keys.forEach((key, index) => {
      if (previous[index] === undefined) delete process.env[key];
      else process.env[key] = previous[index];
    });
  }
});

test("configured speech route checks access before synthesis and returns private MP3 bytes", async () => {
  const config = {
    ELEVENLABS_API_KEY: "test-only-key",
    ELEVENLABS_VOICE_ID: "test_voice",
    STUDIO_ACCESS_TOKEN: "test-only-code",
    STUDIO_ORIGIN: "http://localhost:3100",
  };
  const previous = Object.keys(config).map((key) => process.env[key]);
  const originalFetch = global.fetch;
  let calls = 0;
  Object.assign(process.env, config);
  global.fetch = async (url) => {
    calls += 1;
    assert.match(url, /^https:\/\/api.elevenlabs.io\/v1\/text-to-speech\//);
    return new Response(new Uint8Array([73, 68, 51]), { headers: { "Content-Type": "audio/mpeg" } });
  };
  try {
    assert.equal((await speechRoute.POST(request({ text: "reviewed script" }))).status, 401);
    assert.equal(calls, 0);
    const authorized = request({ text: "reviewed script" });
    authorized.headers.set("authorization", "Bearer test-only-code");
    const response = await speechRoute.POST(authorized);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), "audio/mpeg");
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.equal((await response.arrayBuffer()).byteLength, 3);
    assert.equal(calls, 1);
    const oversized = request({ text: "a".repeat(3001) });
    oversized.headers.set("authorization", "Bearer test-only-code");
    assert.equal((await speechRoute.POST(oversized)).status, 400);
    assert.equal(calls, 1);
  } finally {
    global.fetch = originalFetch;
    Object.keys(config).forEach((key, index) => {
      if (previous[index] === undefined) delete process.env[key];
      else process.env[key] = previous[index];
    });
  }
});
