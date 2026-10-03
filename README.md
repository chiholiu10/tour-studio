# Tour Studio

A personal creative-tooling **MVP** by Chiho Liu. Turn an Amsterdam location into
an editable walking-tour script, listen to a preview, and optionally produce an
ElevenLabs MP3. Built with Next.js App Router, React and TypeScript.

The workspace lives at `/`, the case study at `/case-study`, and the original
refactored assistant remains at `/assistant`.

## Run locally

Use Node.js 22.15 or newer within the Node 22 release line and npm.
`package-lock.json` is the dependency source of truth.

```sh
npm ci
npm run dev
```

Without credentials, the app uses labelled curated examples and your browser's
speech service. The browser service may use remote voices, depending on your
browser/OS. It is not ElevenLabs and does not create downloadable MP3s.

## Optional live generation

```sh
cp .env.example .env.local
```

Fill credentials **locally**, then restart the server. Never use `NEXT_PUBLIC_`
for credentials or commit `.env.local`.

| Variable              | Purpose                                                                     |
| --------------------- | --------------------------------------------------------------------------- |
| `ELEVENLABS_API_KEY`  | Server-only text-to-speech credentials                                      |
| `ELEVENLABS_VOICE_ID` | An authorized voice from your own account                                   |
| `STUDIO_ACCESS_TOKEN` | Long random private-workspace access code; required for paid endpoints      |
| `OPENAI_API_KEY`      | Optional live script generation; examples/manual edits work without it      |
| `OPENAI_MODEL`        | Configurable script model; defaults to `gpt-4.1-mini`                       |
| `STUDIO_ORIGIN`       | Canonical origin behind a reverse proxy, e.g. `https://your-domain.example` |

The browser requests the workspace access code, not a provider key. It keeps the
code in memory only. Audio and drafts are not stored on our server. Providers have
their own retention policies; `store: false` is sent to OpenAI but does not promise
zero provider retention. Never include private information in creative directions.

Live OpenAI calls use billable input/output tokens; ElevenLabs synthesis uses
account credits. No call starts automatically: generation is explicit. Review
[OpenAI pricing](https://developers.openai.com/api/docs/pricing) and your ElevenLabs
account before enabling live generation. Tests mock paid providers and require no
credentials. No paid calls were used to validate this implementation.

## MVP status

The studio and case study contain a visible per-feature status. Examples, editing,
history and text export work. Device preview depends on browser voice availability.
Live adapters are implemented, but OpenAI generation and ElevenLabs synthesis,
playback and MP3 export still require credentials and real-account validation.
Accounts, persisted projects, multilingual UI, pronunciation controls and production
infrastructure are not built. No user research or production outcomes are claimed.

## Workflow and recovery

1. Choose a place, tone and target length; optionally add creative direction.
2. Create a curated example or an AI draft, depending on server configuration.
3. Edit the script. The listening-time estimate is approximate, not a timing promise.
4. Use device preview, or explicitly request an ElevenLabs MP3 when connected.
5. Export text or audio. Draft history keeps up to eight previous drafts in memory.

Generation is single-flight, cancellable and time-bounded. Failure preserves the
existing draft and exposes a retry. Regeneration preserves the previous script;
restoring history preserves the draft being replaced. Editing a script marks
existing audio as an earlier version. Reload/navigation clears the session, so
export work you want to retain.

## Architecture and ownership

- `src/features/tour-studio/tour-model.ts`: shared types, runtime validators, character limits and timing estimates.
- `src/features/tour-studio/example-drafts.ts`: transparent, deterministic no-cost examples.
- `src/features/tour-studio/use-tour-studio.ts`: workspace lifecycle, request cancellation, history and audio cleanup.
- `src/features/tour-studio/components`: controlled panels for brief, script, audio and workspace access.
- `src/features/tour-studio/tour-studio-client.ts`: same-origin API transport and text download.
- `src/features/tour-studio/server`: provider adapters, configuration, access checks and request budgets.
- `src/app/api/studio`: thin route handlers for draft and audio generation.
- `src/app/case-study`: public explanation of scope, design choices and limitations.
- `src/features/assistant`: assistant state, domain logic and chat-specific components.
- `src/shared`: reusable controls, scrolling hook and shared styles.

File and folder names use kebab-case; React components retain PascalCase names and
hooks retain their `use` prefix in code. Next.js keeps its required `page.tsx`,
`layout.tsx` and `route.ts` filenames. Feature-specific code stays with its feature;
shared controls, hooks and styles live in `src/shared`. Test infrastructure lives in
`tests/helpers`, with browser scenarios in `tests/e2e`.

The studio and assistant use styled-components and system fonts. A shared ThemeProvider
and server style registry apply the design-system defaults. Semantic tokens live in
`src/shared/styles/tokens.ts`; `css-reset.ts` exposes inherited CSS variables and base
styles. Each panel owns its scoped styles, and both features inherit the same
typography, spacing, focus, disabled and motion defaults.
Native forms, labels, keyboard focus, modal focus handling, status announcements
and reduced-motion support are part of the UI.

## Quality checks

```sh
npm run check
npm run build
npx playwright install chromium --only-shell
npm run test:e2e
```

`check` runs Prettier, ESLint, strict TypeScript and Node's tests. Tests load the real
TypeScript modules, verify contracts against simulated provider responses, and
exercise server-rendered controls. Playwright covers desktop and mobile example
flows, editing/history, export, failure/retry, cancellation, keyboard navigation,
layout overflow and case-study navigation. It starts an unconfigured local server
on port 3100 or reuses a running server there; run it against example mode.

CI runs separate quality, dependency-audit, production-build and browser jobs.
The required CI gate blocks merging when any check fails. Production deployment
stages the exact tested main commit, promotes it after a successful Vercel build,
checks the public release and pages, and requests rollback if verification fails.
See [CI/CD operations](docs/ci-cd.md) for protection, credentials and recovery. The test suite does not establish live provider
quality, pronunciation, real account permissions, cross-browser speech support or
production scale. A real ElevenLabs-account synthesis test is still required.

Use `npm run format` for consistent formatting. Browser screenshots appear in
`test-results/`; curated portfolio previews are in `docs/screenshots/`.

## Deployment boundaries

The API enforces same-origin requests, byte-level JSON limits, runtime validation,
server-only credentials, constant-time workspace-code comparison, bounded output,
provider timeouts and sanitized error messages. Headers restrict framing, object
embeds, base URLs and unused device permissions. User content is rendered as plain
React text. There is no arbitrary provider URL or browser-selected voice ID.

The private-demo request budget permits at most 30 paid calls per hour and two
concurrent calls **per process**, shared across draft/audio endpoints. It resets
when the process restarts. It is not a monetary cap or a distributed limiter.
A public or multi-instance deployment needs real user authentication, shared
quotas, provider spend limits, HTTPS, observability and retention/access review.
The CSP is deliberately partial; strict script/style policies need nonce integration.

Run `npm audit` before release and address dependency advisories. Passing functional
tests is not a security audit. The obsolete third-party widget loader was removed;
embedding the legacy chat requires an explicit origin allowlist and a real route.

## Portfolio material

- [Case study and validation boundaries](docs/case-study.md)
- [ElevenLabs application question](docs/elevenlabs-application-answer.md)
- [OpenAI structured output contract](https://developers.openai.com/api/docs/guides/structured-outputs)
- [ElevenLabs text-to-speech contract](https://elevenlabs.io/docs/api-reference/text-to-speech/convert)

Install local before-push quality checks with `npm run setup:hooks`. Hooks are local
and bypassable; GitHub branch protection is the enforceable merge boundary.

## GitHub agent

The repository includes **Tour Studio Maintainer** in
[the agent profile](.github/agents/tour-studio-maintainer.agent.md).
On the [Agents page](https://github.com/chiholiu10/tour-studio/agents), choose it in
the custom-agent selector and describe a concrete task, for example:
“Fix the reported mobile layout issue, add a regression test and open a pull request.”
Agent sessions require Copilot cloud-agent access on your GitHub account. The
profile supplies project conventions; it does not start a session automatically.
