const { test } = require("node:test");
const assert = require("node:assert/strict");
const sha = "a".repeat(40);
const env = {
  VERCEL_TOKEN: "mock-vercel-credential",
  VERCEL_PROJECT_ID: "mock-project",
  VERCEL_TEAM_ID: "mock-team",
  GITHUB_TOKEN: "mock-github-credential",
  GITHUB_SHA: sha,
  GITHUB_REPOSITORY: "example/tour-studio",
  GITHUB_REF: "refs/heads/main",
};
const json = (value) => Response.json(value);

function provider({ head = sha, deployedSha = sha, healthy = true, alreadyProduction = false } = {}) {
  const calls = [];
  const fetcher = async (url, options = {}) => {
    const parsed = new URL(url);
    calls.push({
      path: parsed.pathname,
      method: options.method ?? "GET",
      body: options.body ? JSON.parse(options.body) : null,
    });
    if (parsed.hostname === "api.github.com") return json({ object: { sha: head } });
    if (parsed.pathname === "/v9/projects/mock-project") {
      return json({
        autoAssignCustomDomains: false,
        targets: {
          production: {
            id:
              alreadyProduction && calls.some((call) => call.path === "/v13/deployments/staged")
                ? "staged"
                : "previous",
          },
        },
        link: { repoId: 123 },
      });
    }
    if (parsed.pathname === "/v13/deployments") return json({ id: "staged" });
    if (parsed.pathname === "/v13/deployments/staged")
      return json({ readyState: "READY", gitSource: { sha: deployedSha } });
    if (parsed.pathname.includes("/promote/") || parsed.pathname.includes("/rollback/")) return json({});
    if (parsed.pathname === "/api/health") return json({ status: "ok", release: healthy ? sha : "b".repeat(40) });
    return new Response(parsed.pathname === "/" ? "Give places a voice." : "A small studio for stories worth hearing.");
  };
  return { fetcher, calls };
}

test("deployment refuses missing credentials and non-main commits before contacting providers", async () => {
  const { deployProduction } = await import("../scripts/deploy-vercel.mjs");
  const { fetcher, calls } = provider();
  await assert.rejects(deployProduction({ env: {}, fetcher }), /credentials/);
  await assert.rejects(deployProduction({ env: { ...env, GITHUB_REF: "refs/heads/feature" }, fetcher }), /main only/);
  assert.equal(calls.length, 0);
});

test("deployment refuses a stale main SHA or mismatched staged build before promotion", async () => {
  const { deployProduction } = await import("../scripts/deploy-vercel.mjs");
  const stale = provider({ head: "b".repeat(40) });
  await assert.rejects(deployProduction({ env, ...stale }), /Main has changed/);
  assert.equal(
    stale.calls.some((call) => call.method === "POST"),
    false,
  );
  const mismatch = provider({ deployedSha: "b".repeat(40) });
  await assert.rejects(deployProduction({ env, ...mismatch }), /different commit/);
  assert.equal(
    mismatch.calls.some((call) => call.path.includes("/promote/")),
    false,
  );
});

test("deployment stages the exact tested SHA and promotes only after a successful build", async () => {
  const { deployProduction } = await import("../scripts/deploy-vercel.mjs");
  const mock = provider();
  const result = await deployProduction({ env, ...mock });
  assert.equal(result.sha, sha);
  assert.equal(mock.calls.find((call) => call.path === "/v13/deployments").body.gitSource.sha, sha);
  const ready = mock.calls.findIndex((call) => call.path === "/v13/deployments/staged");
  const promote = mock.calls.findIndex((call) => call.path.includes("/promote/"));
  assert.ok(promote > ready);
  assert.equal(
    mock.calls.some((call) => call.path.includes("/rollback/")),
    false,
  );
});

test("a failed public release check requests rollback instead of reporting success", async () => {
  const { deployProduction } = await import("../scripts/deploy-vercel.mjs");
  const mock = provider({ healthy: false });
  await assert.rejects(deployProduction({ env, ...mock, pause: async () => {} }), /rollback/);
  assert.ok(mock.calls.some((call) => call.path === "/v1/projects/mock-project/rollback/previous"));
});

test("an already-current production deployment still passes public verification without promoting twice", async () => {
  const { deployProduction } = await import("../scripts/deploy-vercel.mjs");
  const mock = provider({ alreadyProduction: true });
  await deployProduction({ env, ...mock });
  assert.equal(
    mock.calls.some((call) => call.path.includes("/promote/")),
    false,
  );
  assert.ok(mock.calls.some((call) => call.path === "/api/health"));
});
