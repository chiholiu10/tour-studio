import { timingSafeEqual, createHash } from "node:crypto";
import { isRecord } from "../tour-model";

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export function json(value: unknown, status = 200): Response {
  return Response.json(value, { status, headers: { "Cache-Control": "no-store" } });
}

export function failure(error: unknown): Response {
  if (error instanceof HttpError) return json({ error: error.message }, error.status);
  if (error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError")) {
    return json({ error: "The request took too long or was canceled. Your draft is safe; try again." }, 504);
  }
  return json({ error: "The service could not finish this request. Your draft is safe; please try again." }, 502);
}

export function checkOrigin(request: Request): void {
  const origin = request.headers.get("origin");
  const url = new URL(request.url);
  const expected = process.env.STUDIO_ORIGIN || `${url.protocol}//${request.headers.get("host") || url.host}`;
  if (!origin || origin !== expected) {
    throw new HttpError(403, "This request must come from Tour Studio.");
  }
}

export function requireAccess(request: Request, token: string | undefined): void {
  if (!token) throw new HttpError(503, "Live generation is not configured for this workspace.");
  const supplied = request.headers.get("authorization")?.replace(/^Bearer /, "") ?? "";
  const digest = (value: string) => createHash("sha256").update(value).digest();
  if (!timingSafeEqual(digest(supplied), digest(token))) {
    throw new HttpError(401, "Unlock live generation with the workspace access code.");
  }
}

export async function readJson(request: Request, limit = 16_384): Promise<Record<string, unknown>> {
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    throw new HttpError(415, "Send the request as JSON.");
  }
  const reader = request.body?.getReader();
  if (!reader) throw new HttpError(400, "The request body is missing.");
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) {
        await reader.cancel();
        throw new HttpError(413, "The request is too large.");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  try {
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.length;
    }
    const parsed: unknown = JSON.parse(new TextDecoder().decode(bytes));
    if (!isRecord(parsed)) throw new Error("Not an object");
    return parsed;
  } catch {
    throw new HttpError(400, "The request contains invalid JSON.");
  }
}

// A process-wide budget bounds paid calls in a private, single-instance demo.
// A public/multi-instance deployment needs a shared limiter and real user auth.
export function createBudget(maximum = 30, interval = 3_600_000, concurrency = 2) {
  let windowStart = Date.now();
  let used = 0;
  let active = 0;
  return (now = Date.now()) => {
    if (now - windowStart >= interval) {
      windowStart = now;
      used = 0;
    }
    if (used >= maximum) throw new HttpError(429, "This workspace has reached its hourly limit. Try again later.");
    if (active >= concurrency) throw new HttpError(429, "The workspace is busy. Please try again shortly.");
    used += 1;
    active += 1;
    let released = false;
    return () => {
      if (!released) {
        active -= 1;
        released = true;
      }
    };
  };
}

export const reserveGeneration = createBudget();
