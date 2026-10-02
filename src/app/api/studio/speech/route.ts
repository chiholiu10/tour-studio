import { MAX_SCRIPT_LENGTH } from "@/features/tour-studio/tour-model";
import { providerConfig, tourStudioCapabilities } from "@/features/tour-studio/server/provider-config";
import {
  checkOrigin,
  failure,
  HttpError,
  readJson,
  requireAccess,
  reserveGeneration,
} from "@/features/tour-studio/server/request-utils";
import { generateSpeech } from "@/features/tour-studio/server/ai-providers";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let release: (() => void) | undefined;
  try {
    checkOrigin(request);
    requireAccess(request, process.env.STUDIO_ACCESS_TOKEN);
    if (!tourStudioCapabilities().speech) throw new HttpError(503, "Voice generation is not connected yet.");
    const body = await readJson(request);
    if (typeof body.text !== "string" || !body.text.trim() || body.text.length > MAX_SCRIPT_LENGTH) {
      throw new HttpError(400, "The script must contain between 1 and 3,000 characters.");
    }
    release = reserveGeneration();
    const signal = AbortSignal.any([request.signal, AbortSignal.timeout(60_000)]);
    const audio = await generateSpeech(body.text.trim(), providerConfig(), signal);
    return new Response(audio, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
        "Content-Disposition": 'attachment; filename="tour-studio.mp3"',
      },
    });
  } catch (error) {
    return failure(error);
  } finally {
    release?.();
  }
}
