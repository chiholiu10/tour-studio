import { ScriptPanelSurface } from "./script-panel.styles";
import { Draft, estimatedSeconds, MAX_SCRIPT_LENGTH, wordCount } from "../tour-model";
import { downloadText } from "../tour-studio-client";
import { exportName } from "../tour-model";
import Icon from "./icon";

interface ScriptPanelProps {
  draft: Draft;
  onChange: (script: string) => void;
  busy: boolean;
  versions: { id: number; draft: Draft }[];
  onRestore: (id: number) => void;
}

export default function ScriptPanel({ draft, onChange, busy, versions, onRestore }: ScriptPanelProps) {
  return (
    <ScriptPanelSurface className="tour-scriptPanel" aria-labelledby="script-heading">
      <div className="tour-panelHeading">
        <span className="tour-step">02</span>
        <div>
          <h2 id="script-heading">Make it your story</h2>
          <p>Edit every word before it becomes a voice.</p>
        </div>
        <span className="tour-sourceBadge">{draft.source === "ai" ? "AI draft" : "Curated example"}</span>
      </div>
      <div className="tour-scriptToolbar">
        <span>
          <Icon name="map" /> {draft.title}
        </span>
        <button
          type="button"
          className="tour-iconButton"
          aria-label="Download script as text"
          disabled={!draft.script.trim()}
          onClick={() => downloadText(`${exportName(draft.title)}.txt`, draft.script)}
        >
          <Icon name="download" />
        </button>
      </div>
      <label className="tour-srOnly" htmlFor="script">
        Tour script
      </label>
      <textarea
        id="script"
        className="tour-scriptEditor"
        value={draft.script}
        maxLength={MAX_SCRIPT_LENGTH}
        disabled={busy}
        spellCheck
        aria-describedby="script-meta script-note"
        onChange={(event) => onChange(event.target.value)}
      />
      <div id="script-meta" className="tour-scriptMeta">
        <span>
          {wordCount(draft.script)} words <span aria-hidden="true">·</span> <Icon name="clock" width={13} />~
          {estimatedSeconds(draft.script)}s estimated
        </span>
        <span>{draft.script.length.toLocaleString("en-US")} / 3,000 characters</span>
      </div>
      <div id="script-note" className="tour-draftNote">
        <Icon name="spark" width={15} />
        <p>{draft.note}</p>
      </div>
      {versions.length > 0 && (
        <details className="tour-history">
          <summary>
            Draft history <span>{versions.length}</span>
          </summary>
          <p>Kept for this session. Creating a draft preserves the previous version.</p>
          <ul>
            {versions.map((version) => (
              <li key={version.id}>
                <span>
                  Saved draft {version.id}
                  <small>{version.draft.title}</small>
                </span>
                <button className="tour-textButton" type="button" disabled={busy} onClick={() => onRestore(version.id)}>
                  Restore
                </button>
              </li>
            ))}
          </ul>
        </details>
      )}
    </ScriptPanelSurface>
  );
}
