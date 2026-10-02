import { pathToFileURL } from "node:url";

export async function deployProduction({
  env = process.env,
  fetcher = fetch,
  pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
} = {}) {
  const required = [
    "VERCEL_TOKEN",
    "VERCEL_PROJECT_ID",
    "VERCEL_TEAM_ID",
    "GITHUB_TOKEN",
    "GITHUB_SHA",
    "GITHUB_REPOSITORY",
  ];
  if (required.some((name) => !env[name])) throw new Error("Production deployment credentials are incomplete.");
  if (env.GITHUB_REF !== "refs/heads/main" || !/^[a-f0-9]{40}$/.test(env.GITHUB_SHA)) {
    throw new Error("Production accepts a complete commit SHA from main only.");
  }
  const production = "https://tour-studio-chiholiu10.vercel.app";
  const project = encodeURIComponent(env.VERCEL_PROJECT_ID);
  const request = async (path, method = "GET", data) => {
    const url = new URL(path, "https://api.vercel.com");
    url.searchParams.set("teamId", env.VERCEL_TEAM_ID);
    const response = await fetcher(url, {
      method,
      headers: { Authorization: `Bearer ${env.VERCEL_TOKEN}`, "Content-Type": "application/json" },
      body: data ? JSON.stringify(data) : undefined,
      signal: AbortSignal.timeout(30_000),
    });
    if (!response.ok) throw new Error(`Vercel deployment request failed (HTTP ${response.status}).`);
    return response.json();
  };
  const requireCurrentHead = async () => {
    const response = await fetcher(`https://api.github.com/repos/${env.GITHUB_REPOSITORY}/git/ref/heads/main`, {
      headers: { Authorization: `Bearer ${env.GITHUB_TOKEN}`, Accept: "application/vnd.github+json" },
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok || (await response.json()).object?.sha !== env.GITHUB_SHA) {
      throw new Error("Main has changed; an older pipeline must not publish production.");
    }
  };
  await requireCurrentHead();
  const settings = await request(`/v9/projects/${project}`);
  if (settings.autoAssignCustomDomains !== false) throw new Error("Automatic production promotion must be disabled.");
  const previous = settings.targets?.production?.id;
  if (!previous) throw new Error("A previous production deployment is required for rollback.");
  const deployment = await request("/v13/deployments", "POST", {
    name: "tour-studio",
    project: env.VERCEL_PROJECT_ID,
    target: "production",
    gitSource: { type: "github", repoId: settings.link.repoId, ref: "main", sha: env.GITHUB_SHA },
    meta: { githubCommitSha: env.GITHUB_SHA, githubCommitRef: "main" },
  });
  let ready = false;
  for (let attempt = 0; attempt < 120; attempt += 1) {
    const state = await request(`/v13/deployments/${encodeURIComponent(deployment.id)}`);
    if (state.readyState === "READY") {
      if ((state.gitSource?.sha ?? state.meta?.githubCommitSha) !== env.GITHUB_SHA) {
        throw new Error("Vercel built a different commit; production promotion refused.");
      }
      ready = true;
      break;
    }
    if (["ERROR", "CANCELED"].includes(state.readyState)) throw new Error("The staged Vercel build failed.");
    await pause(5_000);
  }
  if (!ready) throw new Error("The staged Vercel build timed out.");
  await requireCurrentHead();
  try {
    const current = await request(`/v9/projects/${project}`);
    if (current.targets?.production?.id !== deployment.id) {
      await request(`/v10/projects/${project}/promote/${encodeURIComponent(deployment.id)}`, "POST", {});
    }
    let healthy = false;
    for (let attempt = 0; attempt < 24; attempt += 1) {
      try {
        const response = await fetcher(`${production}/api/health`, {
          cache: "no-store",
          signal: AbortSignal.timeout(10_000),
        });
        const health = response.ok ? await response.json() : null;
        if (health?.status === "ok" && health.release === env.GITHUB_SHA) {
          healthy = true;
          break;
        }
      } catch {
        // A rollout can briefly return a connection error; retry within the bounded window.
      }
      await pause(5_000);
    }
    if (!healthy) throw new Error("The public healthcheck did not confirm the tested commit.");
    for (const [path, marker] of [
      ["/", "Give places a voice."],
      ["/case-study", "A small studio for stories worth hearing."],
    ]) {
      const response = await fetcher(production + path, { signal: AbortSignal.timeout(15_000) });
      if (!response.ok || !(await response.text()).includes(marker))
        throw new Error("A production page smoke check failed.");
    }
  } catch {
    await request(`/v1/projects/${project}/rollback/${encodeURIComponent(previous)}`, "POST", {});
    throw new Error("Production verification failed; rollback to the previous deployment was requested.");
  }
  return { id: deployment.id, url: production, sha: env.GITHUB_SHA };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  deployProduction().then(
    () => process.stdout.write("The tested commit is deployed and production smoke checks passed.\n"),
    (error) => {
      process.stderr.write(`Deployment failed: ${error.message}\n`);
      process.exitCode = 1;
    },
  );
}
