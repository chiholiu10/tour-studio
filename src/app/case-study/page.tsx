import { TourStudioSurface } from "@/features/tour-studio/tour-studio.styles";
import { CaseStudySurface } from "@/features/tour-studio/case-study.styles";
import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/features/tour-studio/components/icon";
import MvpStatus from "@/features/tour-studio/components/mvp-status";
import { tourStudioCapabilities } from "@/features/tour-studio/server/provider-config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Tour Studio — Behind the build" };

export default function CaseStudy() {
  return (
    <TourStudioSurface className="tour-shell">
      <header className="tour-topbar">
        <Link className="tour-brand" href="/">
          <span className="tour-brandMark">
            <Icon name="wave" />
          </span>
          tour<span>/</span>studio
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/">
            Open the studio <Icon name="arrow" />
          </Link>
        </nav>
      </header>
      <CaseStudySurface className="tour-caseMain">
        <span className="tour-eyebrow">CHIHO LIU · DESIGN & FRONTEND ENGINEERING</span>
        <h1>A small studio for stories worth hearing.</h1>
        <p className="tour-caseLead">
          Tour Studio explores a simple question: how can a creator turn a place into a short audio story, without
          losing control of the words along the way?
        </p>
        <div className="tour-caseTags">
          <span>Personal MVP</span>
          <span>Creative tooling</span>
          <span>Next.js & TypeScript</span>
          <span>ElevenLabs integration</span>
        </div>
        <section className="tour-caseSection">
          <h2>The starting point</h2>
          <div>
            <p>
              The project began as a small draggable ticket-chat demo. Its conversation UI hid the actual creative work.
              Tour Studio gives that work a visible shape: choose a place, shape a script, then listen.
            </p>
            <p>
              The scope is deliberately small: three Amsterdam locations, short English narration, editable text,
              session history and export. This is a personal MVP. Booking, production scale and enterprise workflows are
              outside its current scope.
            </p>
          </div>
        </section>
        <section className="tour-caseSection">
          <h2>MVP status</h2>
          <div>
            <p>
              The core example flow works. Live API adapters are implemented, but real-account validation is still
              outstanding. Expand the status below for each feature.
            </p>
            <MvpStatus capabilities={tourStudioCapabilities()} />
          </div>
        </section>
        <section className="tour-caseSection">
          <h2>Design decisions</h2>
          <ul>
            <li>
              A persistent script editor keeps the creator in control. Generation proposes a draft; it never publishes.
            </li>
            <li>A three-step layout makes the workflow visible, with a single-column version for smaller screens.</li>
            <li>Curated examples let reviewers explore without credentials. Their origin is explicit.</li>
            <li>
              Device preview is separate from ElevenLabs production audio. A browser voice is never presented as an AI
              export.
            </li>
            <li>
              Cancel, retry and version restore preserve creative work. Edited text marks existing audio as an earlier
              draft.
            </li>
          </ul>
        </section>
        <section className="tour-caseSection">
          <h2>End-to-end architecture</h2>
          <div>
            <div
              className="tour-caseDiagram"
              aria-label="Brief flows through validation to AI draft, editing and audio export"
            >
              <span>Brief</span> → <span>Validated server API</span> → <span>Editable draft</span>→{" "}
              <span>ElevenLabs MP3</span>
            </div>
            <p>
              React manages the workspace. Next.js route handlers validate input, enforce workspace access, bound paid
              requests and call provider adapters. OpenAI structured output supplies an optional AI script; ElevenLabs
              converts the reviewed script to MP3. Credentials stay on the server.
            </p>
            <p>
              The initial draft and browser preview work without paid providers. Drafts and audio remain in the current
              browser session; export is explicit. The original assistant is preserved at{" "}
              <Link href="/assistant">/chat</Link>.
            </p>
          </div>
        </section>
        <section className="tour-caseSection">
          <h2>ElevenLabs exploration</h2>
          <div>
            <p>
              I built a personal audio-tour workspace with an ElevenLabs text-to-speech adapter: a creator can review an
              editable script, request narration, play the result and download an MP3. The integration handles
              cancellation, provider errors and audio that no longer matches the edited script.
            </p>
            <p>
              The adapter follows the{" "}
              <a
                href="https://elevenlabs.io/docs/api-reference/text-to-speech/convert"
                target="_blank"
                rel="noopener noreferrer"
              >
                official ElevenLabs API
              </a>
              . Automated tests use simulated provider responses. A real-account synthesis test still requires server
              credentials; this case study does not claim live audio quality or production usage.
            </p>
          </div>
        </section>
        <section className="tour-caseSection">
          <h2>Validation & limits</h2>
          <div>
            <p>
              The project includes domain, API-contract and browser regression tests for the creative flow,
              accessibility semantics and error recovery. The repository documents commands and test boundaries.
            </p>
            <p>
              There is no fabricated user research, conversion lift or production scale claim. The access code and
              in-memory request budget suit a private demo. Public deployment needs user authentication, distributed
              quotas, observability and a provider data-retention review.
            </p>
          </div>
        </section>
        <section className="tour-caseSection">
          <h2>What I would explore next</h2>
          <div>
            <p>
              Test the workflow with tour creators, measure time to first usable script and observe where people edit or
              regenerate. Then investigate pronunciation controls, multilingual review and section-level audio
              regeneration based on those findings.
            </p>
            <Link className="tour-textButton" href="/">
              Try the workspace <Icon name="arrow" />
            </Link>
          </div>
        </section>
      </CaseStudySurface>
    </TourStudioSurface>
  );
}
