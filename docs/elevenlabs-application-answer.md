# Have you used ElevenLabs — even in a personal or side project? What did you build or explore?

## Accurate answer for the current project

> I built Tour Studio, a personal project that turns a place into an editable audio-tour script. I implemented an ElevenLabs text-to-speech integration so a creator can review the script, generate narration, listen to the result and export an MP3. I focused on the workflow around generation: cancellation, recoverable errors, version history and clearly identifying audio that no longer matches an edited script. The integration is currently tested with simulated provider responses; I haven't yet validated it against a live ElevenLabs account. That live synthesis and listening test is my next step.

This wording describes the implementation accurately. Do not answer "yes, I've used
it live" until an actual request has succeeded and you have listened to the result.
A browser speech preview is not ElevenLabs experience.

## After a real-account test

Once live synthesis is completed, replace the final two sentences with concrete
observations about the voice/model used, pronunciation, edit-to-audio workflow,
latency or error recovery. Do not invent results or imply enterprise deployment.

## Practical live-validation steps

1. Put your own ElevenLabs API key, an authorized voice ID and a private workspace
   access code in `.env.local`. OpenAI is optional; a manually edited script is enough.
2. Restart Tour Studio and enter the workspace code in the app.
3. Review a short non-sensitive script and explicitly select **Generate MP3**.
   This may use ElevenLabs account credits.
4. Listen, download the MP3, edit one sentence and verify the earlier-audio notice.
5. Record your actual observations and update the application answer accordingly.

No paid provider calls were made during implementation tests.
