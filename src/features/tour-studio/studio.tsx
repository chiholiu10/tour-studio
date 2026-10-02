"use client";
import { StudioSurface } from "./studio.styles";

import Link from "next/link";
import { StudioCapabilities } from "./tour-model";
import { useStudio } from "./use-studio";
import BriefPanel from "./components/brief-panel";
import ScriptPanel from "./components/script-panel";
import AudioPanel from "./components/audio-panel";
import AccessDialog from "./components/access-dialog";
import MvpStatus from "./components/mvp-status";
import Icon from "./components/icon";

export default function Studio({ capabilities }: { capabilities: StudioCapabilities }) {
  const studio = useStudio(capabilities);
  const live = capabilities.drafts || capabilities.speech;
  return (
    <StudioSurface className="tour-shell">
      <a className="tour-skipLink" href="#workspace">
        Skip to workspace
      </a>
      <header className="tour-topbar">
        <Link className="tour-brand" href="/" aria-label="Tour Studio home">
          <span className="tour-brandMark">
            <Icon name="wave" width={22} height={22} />
          </span>
          tour<span>/</span>studio
        </Link>
        <nav aria-label="Main navigation">
          <span className="tour-topbarLabel">A PERSONAL MVP</span>
          <Link href="/case-study" target="_blank" rel="noopener noreferrer">
            Behind the build <Icon name="arrow" width={14} />
          </Link>
          <span className="tour-avatar" aria-label="Built by Chiho Liu">
            CL
          </span>
        </nav>
      </header>
      <div className="tour-appLayout">
        <aside className="tour-sidebar" aria-label="Project overview">
          <span className="tour-eyebrow">YOUR WORKSPACE</span>
          <a className="tour-activeNav" href="#workspace">
            <Icon name="spark" />
            Create a tour
            <Icon name="arrow" width={14} />
          </a>
          <Link className="tour-sidebarLink" href="/case-study" target="_blank" rel="noopener noreferrer">
            <Icon name="map" />
            Project case study
          </Link>
          <div className="tour-sidebarCollection">
            <span className="tour-eyebrow">THE COLLECTION</span>
            <div className="tour-cityIllustration" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <h2>
              Amsterdam,
              <br />
              one story at a time.
            </h2>
            <p>
              Three places to begin.
              <br />
              Your perspective to make them yours.
            </p>
          </div>
          <div className="tour-sidebarFooter">
            <span className="tour-statusDot" />
            {live ? "Live tools available" : "Explore in example mode"}
            <p>
              Drafts stay while this page is open.
              <br />
              Export what you want to keep.
            </p>
          </div>
        </aside>
        <main id="workspace" className="tour-workspace">
          <div className="tour-pageIntro">
            <div>
              <span className="tour-eyebrow">FROM A PLACE TO A PLAY BUTTON</span>
              <h1>Give places a voice.</h1>
              <p>Shape a short walking tour. Find its rhythm. Hear it come to life.</p>
            </div>
            <div className="tour-sessionBadge">
              <span className="tour-statusDot" />
              {live ? "MVP · Connected workspace" : "MVP · No-cost example mode"}
            </div>
          </div>
          <MvpStatus capabilities={capabilities} />
          <div className="tour-workflow" aria-label="Creative workflow">
            <span>
              <b>01</b> Set the scene
            </span>
            <i />
            <span>
              <b>02</b> Shape the story
            </span>
            <i />
            <span>
              <b>03</b> Find the voice
            </span>
          </div>
          {live && (
            <div className="tour-connectionBar">
              <p>Live tools use provider credits when you generate.</p>
              <button className="tour-textButton" type="button" onClick={() => studio.setShowUnlock(true)}>
                {studio.token ? "Change access code" : "Enter access code"}
              </button>
            </div>
          )}
          {studio.error && (
            <div className="tour-error" role="alert" aria-label="Generation error">
              <div>
                <strong>We couldn’t finish that.</strong>
                <p>{studio.error.message}</p>
              </div>
              <button
                type="button"
                className="tour-secondaryButton"
                disabled={Boolean(studio.busy)}
                onClick={() => void studio.retry()}
              >
                Try again
              </button>
              <button
                className="tour-iconButton"
                type="button"
                aria-label="Dismiss error"
                onClick={() => studio.setError(null)}
              >
                <Icon name="close" />
              </button>
            </div>
          )}
          {studio.busy && (
            <div className="tour-progress" role="status">
              <span>{studio.busy === "draft" ? "Shaping your script…" : "Bringing your script to life…"}</span>
              <button className="tour-textButton" type="button" onClick={studio.cancel}>
                Cancel generation
              </button>
            </div>
          )}
          <div className="tour-workbench" aria-busy={Boolean(studio.busy)}>
            <BriefPanel
              brief={studio.brief}
              onChange={studio.setBrief}
              busy={Boolean(studio.busy)}
              live={capabilities.drafts}
              onGenerate={() => void studio.generateDraft()}
            />
            <div className="tour-outputColumn">
              <ScriptPanel
                draft={studio.draft}
                onChange={studio.updateScript}
                busy={Boolean(studio.busy)}
                versions={studio.versions}
                onRestore={studio.restoreVersion}
              />
              <AudioPanel
                connected={capabilities.speech}
                busy={Boolean(studio.busy)}
                generating={studio.busy === "speech"}
                hasScript={Boolean(studio.draft.script.trim())}
                onGenerate={() => void studio.generateSpeech()}
                onPreview={studio.preview}
                canPreview={studio.canPreview}
                previewing={studio.previewing}
                audio={studio.audio}
                current={studio.audioIsCurrent}
              />
            </div>
          </div>
          <footer className="tour-workspaceFooter">
            <span>Designed & built by Chiho Liu</span>
            <span>
              Next.js · React · TypeScript <span aria-hidden="true">↗</span>
            </span>
          </footer>
          <p className="tour-srOnly" role="status" aria-live="polite">
            {studio.announcement}
          </p>
        </main>
      </div>
      <AccessDialog open={studio.showUnlock} onClose={() => studio.setShowUnlock(false)} onSave={studio.setToken} />
    </StudioSurface>
  );
}
