import { MvpStatusSurface } from "./mvp-status.styles";
import { StudioCapabilities } from "../tour-model";

export default function MvpStatus({ capabilities }: { capabilities: StudioCapabilities }) {
  return (
    <MvpStatusSurface className="tour-mvpStatus">
      <summary>
        <strong>Personal MVP</strong>
        <span>What works, what needs setup, and what comes next</span>
      </summary>
      <div className="tour-mvpContent">
        <p>
          A working creative-flow prototype. It has not been validated with real provider accounts, tour creators or
          production traffic.
        </p>
        <div className="tour-mvpTableWrapper">
          <table className="tour-mvpTable">
            <thead>
              <tr>
                <th scope="col">Feature</th>
                <th scope="col">Current status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Example scripts, editing, draft history, text export</th>
                <td>Implemented and covered by automated tests. Work is kept only while this page is open.</td>
              </tr>
              <tr>
                <th scope="row">Device voice preview</th>
                <td>Implemented; browser/OS voice availability varies. This is not ElevenLabs audio.</td>
              </tr>
              <tr>
                <th scope="row">OpenAI script generation</th>
                <td>
                  {capabilities.drafts
                    ? "Configured. Live provider quality has not been validated. Generation uses API credits."
                    : "Not connected in this workspace. The server adapter is implemented; examples do not use AI."}
                </td>
              </tr>
              <tr>
                <th scope="row">ElevenLabs narration, playback & MP3 export</th>
                <td>
                  {capabilities.speech
                    ? "Configured. Real synthesis, listening quality and account access still need live validation."
                    : "Not connected in this workspace. Generate MP3 is unavailable until server credentials are set."}
                </td>
              </tr>
              <tr>
                <th scope="row">Accounts, saved projects & cloud storage</th>
                <td>Not built. Reloading or closing the page clears drafts and audio.</td>
              </tr>
              <tr>
                <th scope="row">Multilingual tours & pronunciation controls</th>
                <td>Not built. The MVP creates English scripts with one server-configured voice.</td>
              </tr>
              <tr>
                <th scope="row">Public/enterprise deployment</th>
                <td>Not production-ready. Needs user auth, shared quotas, monitoring and privacy review.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>Next work:</strong> a real-account synthesis test and creator feedback. No live quality, user-research
          results or production-scale results are claimed.
        </p>
      </div>
    </MvpStatusSurface>
  );
}
