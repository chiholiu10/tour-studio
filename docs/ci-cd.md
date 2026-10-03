# CI/CD operations

The GitHub workflow runs on pushes, pull requests, merge queues and manual runs.
Four checks feed the required `CI gate`: formatting/lint/TypeScript/unit tests,
dependency audit, production build, and desktop/mobile browser tests against that
production build. A failed, skipped or cancelled check cannot pass the gate.
Browser reports are retained for seven days. Flaky tests fail CI even if a retry
passes. Actions are pinned to commit SHAs and Dependabot checks updates weekly.

## Protected main

Use a feature branch and pull request. Main requires an up-to-date successful
`CI gate`, resolved conversations and a linear history. Direct pushes, branch
removal and force pushes are blocked, including for admins. The solo-project
configuration requires checks but no independent review; set required approval
count to one when another reviewer is available.

`npm run setup:hooks` enables local pre-push formatting, lint, type and unit checks.
These are local and can be bypassed. GitHub CI starts after a feature-branch push;
branch protection prevents unchecked code from entering main. Tests cannot prove
that a project contains no bugs or replaces a security/accessibility review.

## Production deployment

Only a push to main whose entire CI gate passed can run the production job.
The `production` environment allows main only. Its Vercel token is scoped to this
project, expires on 2026-12-31, and is never exposed to PR jobs. Renew it before
expiry using a project-scoped token; store it as the environment's `VERCEL_TOKEN`.
The environment variables `VERCEL_PROJECT_ID` and `VERCEL_TEAM_ID` identify the
existing project and team. No AI-provider credentials are provided to CI tests.

The deployment script checks main's current SHA, stages that exact commit through
Vercel, waits for READY, confirms the built SHA, checks main again, then promotes.
Automatic main deployments are disabled in `vercel.json`; automatic domain
assignment is disabled in Vercel's project settings. Preview branches may still
build automatically. Do not enable automatic production promotion alongside this
workflow, because that would bypass the CI deployment gate.

The public `/api/health` must return the tested SHA via Vercel's system environment
variable. The homepage and case-study smoke checks must also pass. A failed public
verification requests rollback to the previous production deployment and fails
the job. It does not claim to verify the rollback finished: verify the live site
and Vercel dashboard. Deployment jobs are serialized, and main runs are not
cancelled in the middle of promotion. An outdated main SHA is rejected.

For manual recovery, use Vercel's rollback to the last known-good deployment.
For a code fix, submit another PR and let checks and deployment run. Production
secrets belong in GitHub environment settings, never in the repository or a PR.
A main workflow may be rerun; it refuses deployment if main has advanced.

The project remains a portfolio MVP. CI/CD does not add enterprise authentication,
persistence, distributed quotas or live ElevenLabs validation.

## Dependency compatibility

Dependabot groups compatible minor and patch lint-tooling updates. ESLint and
`@eslint/js` stay on major 9 while the React lint plugin does not support major 10.
`eslint-config-next` stays on the Next.js framework's major version; upgrading
its major requires a coordinated framework migration. Node type definitions
track the deployed Node 22 runtime rather than the newest Node release.
These major-update exclusions do not disable security updates or the dependency
audit. Revisit the constraints when upgrading the framework, runtime or plugins.
