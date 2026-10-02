# Tour Studio — portfolio case study

## Problem and scope

Creators need control over narration, not just a chat answer. The original project
was a small ticket-chat demo. Tour Studio turns it into a creative workflow:
a brief leads to an editable script, then a listening preview and optional MP3.

This is a personal **MVP** with three Amsterdam locations, short English scripts
and session-only state. It demonstrates product design and a bounded full-stack
integration; it does not establish enterprise experience or production scale.

## Design reasoning

The brief stays beside the script on desktop. Mobile uses the same workflow in a
single column. Labels and sample text make the first action discoverable.
The script is an editor rather than a read-only bubble, so the user can remove
claims, change phrasing and keep their own creative voice before synthesis.

Curated examples make the workflow reviewable without billing or credentials.
They disclose their origin, and do not pretend to follow arbitrary custom prompts.
Device preview is explicitly different from ElevenLabs-generated downloadable audio.

Failures leave the script intact. Generation can be canceled. History preserves
replaced drafts, and stale audio is labelled when the script changes. Reload does
not save work; the interface invites explicit export rather than hidden retention.

## Engineering decisions

A shared domain module validates requests and provider output at runtime.
Small provider adapters use native fetch and are tested with injected transports.
Route handlers keep secrets, auth, rate budgets and timeout policies on the server.
React controls only workspace state and UI lifecycle. Object URLs and speech
preview are cleaned up when replaced or unmounted.

The studio adds no runtime design or animation libraries. A shared styled-components design system and system
fonts keep the design easy to transfer. The legacy widget stays available at
`/assistant`, with its existing styled-components implementation.

## ElevenLabs integration

The server adapter submits reviewed text to the documented text-to-speech endpoint,
using a server-configured voice and the multilingual model. It validates MP3 responses
and maps quota and upstream failures to actionable UI errors without exposing provider
messages or credentials. Successful audio can be played and downloaded; later script
edits identify it as a prior version.

The adapter and route contract are exercised with mocked provider responses. No
live ElevenLabs account, audio quality assessment or production usage is claimed.
To establish actual ElevenLabs use, configure an authorized voice/key locally,
synthesize a short non-sensitive sample, listen to it, export it, and record the
model/voice and observed quality/latency. That synthesis may use account credits.

## Evidence and boundaries

`npm run check`, `npm run build` and `npm run test:e2e` provide reproducible checks. The repository
contains desktop/mobile previews. Browser tests cover script creation, edits,
history restore, text downloads, errors/retry, cancellation, focus and layout overflow.
Provider tests verify auth, validation, request contracts and rejected output.

Tests do not measure user outcomes or production throughput. There are no invented
conversion statistics, user interviews or accessibility certification claims.
A private access code and in-memory budget are sufficient only for a trusted demo;
public launch needs proper identity, distributed limits and telemetry.

## Next experiments

Interview a few tour creators, observe time to a usable draft, and ask where the
workflow loses their intent. Use that evidence to prioritize pronunciation controls,
multilingual review, section-level regeneration and persistent projects.
