import { Brief, Draft, isRecord, parseDraft } from "./tour-model";

async function requireSuccess(response: Response): Promise<void> {
  if (response.ok) return;
  let message = "The request could not be completed. Your draft is safe; please try again.";
  try {
    const body: unknown = await response.json();
    if (isRecord(body) && typeof body.error === "string") message = body.error.slice(0, 300);
  } catch {
    /* A proxy may return an HTML error page. */
  }
  throw new Error(message);
}

function requestOptions(payload: unknown, token: string, signal: AbortSignal): RequestInit {
  return {
    method: "POST",
    signal,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  };
}

export async function requestDraft(brief: Brief, token: string, signal: AbortSignal): Promise<Draft> {
  const response = await fetch("/api/studio/draft", requestOptions(brief, token, signal));
  await requireSuccess(response);
  return parseDraft(await response.json());
}

export async function requestSpeech(text: string, token: string, signal: AbortSignal): Promise<Blob> {
  const response = await fetch("/api/studio/speech", requestOptions({ text }, token, signal));
  await requireSuccess(response);
  if (!response.headers.get("content-type")?.includes("audio/mpeg")) {
    throw new Error("The voice service returned an invalid audio file. Please try again.");
  }
  const blob = await response.blob();
  if (!blob.size || blob.size > 10_000_000) throw new Error("The audio file could not be loaded. Please try again.");
  return blob;
}

export function downloadText(title: string, script: string): void {
  const url = URL.createObjectURL(new Blob([script], { type: "text/plain;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = title;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
