import { BriefPanelSurface } from "./brief-panel.styles";
import { Brief, Duration, locations, Location, MAX_BRIEF_LENGTH, Tone } from "../tour-model";
import Icon from "./icon";

interface BriefPanelProps {
  brief: Brief;
  onChange: (brief: Brief) => void;
  onGenerate: () => void;
  busy: boolean;
  live: boolean;
}

export default function BriefPanel({ brief, onChange, onGenerate, busy, live }: BriefPanelProps) {
  return (
    <BriefPanelSurface className="tour-briefPanel" aria-labelledby="brief-heading">
      <div className="tour-panelHeading">
        <span className="tour-step">01</span>
        <div>
          <h2 id="brief-heading">Set the scene</h2>
          <p>A few details. A better first draft.</p>
        </div>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onGenerate();
        }}
      >
        <fieldset disabled={busy} className="tour-fieldset">
          <legend className="tour-srOnly">Tour brief</legend>
          <span className="tour-label">Where are we walking?</span>
          <div className="tour-locationList" role="radiogroup" aria-label="Walking location">
            {(Object.keys(locations) as Location[]).map((location) => (
              <label
                key={location}
                className={`tour-locationCard ${brief.location === location ? "tour-selected" : ""}`}
              >
                <input
                  type="radio"
                  name="location"
                  value={location}
                  checked={brief.location === location}
                  onChange={() => onChange({ ...brief, location })}
                />
                <span className="tour-locationNumber">{locations[location].number}</span>
                <span>
                  <strong>{locations[location].label}</strong>
                  <small>{locations[location].detail}</small>
                </span>
                <span className="tour-radioMark">
                  {brief.location === location && <Icon name="check" width={12} />}
                </span>
              </label>
            ))}
          </div>
          <label className="tour-label" htmlFor="tone">
            How should it feel?
          </label>
          <select
            id="tone"
            value={brief.tone}
            onChange={(event) => onChange({ ...brief, tone: event.target.value as Tone })}
          >
            <option value="warm">Warm & conversational</option>
            <option value="cinematic">Cinematic & reflective</option>
            <option value="playful">Playful & curious</option>
          </select>
          <span className="tour-label">Target listening time</span>
          <div className="tour-segmented" role="group" aria-label="Target listening time">
            {(["30", "60", "90"] as Duration[]).map((duration) => (
              <button
                type="button"
                key={duration}
                aria-pressed={brief.duration === duration}
                className={brief.duration === duration ? "tour-activeSegment" : ""}
                onClick={() => onChange({ ...brief, duration })}
              >
                {duration}s
              </button>
            ))}
          </div>
          <label className="tour-label" htmlFor="direction">
            Creative direction <span>optional</span>
          </label>
          <textarea
            id="direction"
            className="tour-direction"
            value={brief.direction}
            maxLength={MAX_BRIEF_LENGTH}
            aria-describedby="direction-hint"
            placeholder="Open with the sound of water. Invite the listener
            to slow down."
            onChange={(event) => onChange({ ...brief, direction: event.target.value })}
          />
          <p id="direction-hint" className="tour-hint">
            {live
              ? "Used in your AI draft. Leave out personal or confidential information."
              : "Example mode uses curated scripts. Custom direction needs a live connection."}
          </p>
          <button className="tour-primaryButton" type="submit">
            <Icon name="spark" />
            {busy ? "Generation in progress…" : live ? "Generate AI draft" : "Create example draft"}
            <Icon name="arrow" />
          </button>
        </fieldset>
      </form>
      <div className="tour-editorialNote">
        <span className="tour-eyebrow">A LITTLE CREATIVE RULE</span>
        <p>
          Write for the ear.
          <br />
          Leave room for the place.
        </p>
        <span>A short pause can tell a story, too.</span>
      </div>
    </BriefPanelSurface>
  );
}
