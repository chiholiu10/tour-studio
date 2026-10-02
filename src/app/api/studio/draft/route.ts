import { parseBrief } from "@/features/tour-studio/tour-model";
import { createExample } from "@/features/tour-studio/example-drafts";
import { providerConfig, studioCapabilities } from "@/features/tour-studio/server/provider-config";
import {
  checkOrigin,
  failure,
  HttpError,
  json,
  readJson,
  requireAccess,
  reserveGeneration,
} from "@/features/tour-studio/server/request-utils";
import { generateDraft } from "@/features/tour-studio/server/ai-providers";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let release: (() => void) | undefined;
  try {
    checkOrigin(request);
    const body = await readJson(request);
    let brief;
    try {
      brief = parseBrief(body);
    } catch (error) {
      throw new HttpError(400, (error as Error).message);
    }
    if (!studioCapabilities().drafts) return json(createExample(brief));
    requireAccess(request, process.env.STUDIO_ACCESS_TOKEN);
    release = reserveGeneration();
    const signal = AbortSignal.any([request.signal, AbortSignal.timeout(45_000)]);
    return json(await generateDraft(brief, providerConfig(), signal));
  } catch (error) {
    return failure(error);
  } finally {
    release?.();
  }
}
