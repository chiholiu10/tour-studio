import { StudioCapabilities } from "../tour-model";

export function providerConfig() {
  return {
    openaiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL,
    elevenLabsKey: process.env.ELEVENLABS_API_KEY,
    voiceId: process.env.ELEVENLABS_VOICE_ID,
  };
}

export function studioCapabilities(): StudioCapabilities {
  const config = providerConfig();
  const accessRequired = Boolean(process.env.STUDIO_ACCESS_TOKEN);
  return {
    drafts: Boolean(config.openaiKey && accessRequired),
    speech: Boolean(config.elevenLabsKey && config.voiceId && accessRequired),
    accessRequired,
  };
}
