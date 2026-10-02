import { AudioPanelSurface } from "./audio-panel.styles";
import { exportName } from "../tour-model";
import Icon from "./icon";

interface AudioPanelProps {
  connected: boolean;
  busy: boolean;
  generating: boolean;
  hasScript: boolean;
  onGenerate: () => void;
  onPreview: () => void;
  canPreview: boolean;
  previewing: boolean;
  audio: { url: string; title: string } | null;
  current: boolean;
}

export default function AudioPanel({
  connected,
  busy,
  generating,
  hasScript,
  onGenerate,
  onPreview,
  canPreview,
  previewing,
  audio,
  current,
}: AudioPanelProps) {
  return (
    <AudioPanelSurface className="tour-audioPanel" aria-labelledby="audio-heading">
      <div className="tour-panelHeading">
        <span className="tour-step">03</span>
        <div>
          <h2 id="audio-heading">Let it be heard</h2>
          <p>A story comes to life when you listen.</p>
        </div>
        <span className="tour-voiceBadge">
          <Icon name="wave" /> {connected ? "ElevenLabs connected" : "Voice preview"}
        </span>
      </div>
      <div className="tour-voiceBody">
        <div className="tour-voiceOrb" aria-hidden="true">
          <Icon name="wave" width={30} height={30} />
        </div>
        <div className="tour-voiceDescription">
          <strong>{connected ? "Your workspace narrator" : "Listen before you produce"}</strong>
          <p>
            {connected ? "ElevenLabs · English narration · MP3 export" : "Free device preview · no API credits used"}
          </p>
        </div>
        <button
          type="button"
          className="tour-secondaryButton"
          disabled={!canPreview || !hasScript || busy}
          onClick={onPreview}
        >
          <Icon name={previewing ? "pause" : "play"} />
          {previewing ? "Stop preview" : "Device preview"}
        </button>
        <button
          type="button"
          className="tour-darkButton"
          disabled={!connected || !hasScript || busy}
          onClick={onGenerate}
        >
          <Icon name="wave" />
          {generating ? "Generating voice…" : "Generate MP3"}
        </button>
      </div>
      <p className="tour-audioDisclaimer">
        {connected
          ? "Generate MP3 sends this script to ElevenLabs and uses your account credits. " +
            "Device preview uses a browser voice."
          : "Device preview uses your browser’s speech service, not ElevenLabs. " +
            "Connect ElevenLabs server credentials for MP3 export."}
      </p>
      {audio && (
        <div className="tour-audioResult">
          <div>
            <strong>{current ? "Your narration is ready" : "Audio from an earlier draft"}</strong>
            <a className="tour-textButton" href={audio.url} download={`${exportName(audio.title)}.mp3`}>
              <Icon name="download" /> Download MP3
            </a>
          </div>
          {!current && <p>The script has changed. Generate a new MP3 to hear your edits.</p>}
          <audio controls src={audio.url} aria-label="Generated tour narration" preload="metadata" />
        </div>
      )}
    </AudioPanelSurface>
  );
}
