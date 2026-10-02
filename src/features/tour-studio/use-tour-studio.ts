"use client";

import { useEffect, useRef, useState } from "react";
import { Brief, Draft, initialBrief, MAX_VERSIONS, TourStudioCapabilities } from "./tour-model";
import { createExample } from "./example-drafts";
import { requestDraft, requestSpeech } from "./tour-studio-client";

interface Version {
  id: number;
  draft: Draft;
}
interface AudioResult {
  url: string;
  script: string;
  title: string;
}
interface StudioError {
  action: "draft" | "speech" | "preview";
  message: string;
}

export function useTourStudio(capabilities: TourStudioCapabilities) {
  const [brief, setBrief] = useState<Brief>(initialBrief);
  const [draft, setDraft] = useState<Draft>(() => createExample(initialBrief));
  const [versions, setVersions] = useState<Version[]>([]);
  const [busy, setBusy] = useState<"draft" | "speech" | null>(null);
  const [error, setError] = useState<StudioError | null>(null);
  const [audio, setAudio] = useState<AudioResult | null>(null);
  const [token, setToken] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [previewing, setPreviewing] = useState(false);
  const [canPreview, setCanPreview] = useState(false);
  const [showUnlock, setShowUnlock] = useState(false);
  const request = useRef<AbortController | null>(null);
  const sequence = useRef(0);
  const audioUrl = useRef<string | null>(null);
  const synthesis = useRef<SpeechSynthesisUtterance | null>(null);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    setCanPreview("speechSynthesis" in window);
    return () => {
      mounted.current = false;
      request.current?.abort();
      if (audioUrl.current) URL.revokeObjectURL(audioUrl.current);
      if (synthesis.current) window.speechSynthesis?.cancel();
    };
  }, []);

  function stopPreview() {
    synthesis.current = null;
    window.speechSynthesis?.cancel();
    setPreviewing(false);
  }

  function updateScript(script: string) {
    if (previewing) stopPreview();
    setDraft((previous) => ({ ...previous, script }));
  }

  async function run(action: "draft" | "speech") {
    if (request.current) return;
    const live = action === "draft" ? capabilities.drafts : capabilities.speech;
    if (live && !token) {
      setShowUnlock(true);
      return;
    }
    const controller = new AbortController();
    request.current = controller;
    setBusy(action);
    setError(null);
    stopPreview();
    const snapshot = draft;
    const briefSnapshot = brief;
    try {
      const signal = AbortSignal.any([controller.signal, AbortSignal.timeout(70_000)]);
      if (action === "draft") {
        const result = await requestDraft(briefSnapshot, token, signal);
        if (!mounted.current || controller.signal.aborted) return;
        sequence.current += 1;
        const id = sequence.current;
        setVersions((previous) => [{ id, draft: snapshot }, ...previous].slice(0, MAX_VERSIONS));
        setDraft(result);
        setAnnouncement(
          result.source === "ai" ? "Your AI draft is ready to edit." : "Your example draft is ready to edit.",
        );
      } else {
        const result = await requestSpeech(snapshot.script, token, signal);
        if (!mounted.current || controller.signal.aborted) return;
        if (audioUrl.current) URL.revokeObjectURL(audioUrl.current);
        audioUrl.current = URL.createObjectURL(result);
        setAudio({ url: audioUrl.current, script: snapshot.script, title: snapshot.title });
        setAnnouncement("Your ElevenLabs audio is ready. Play it or download the MP3.");
      }
    } catch (caught) {
      if (!mounted.current || controller.signal.aborted) return;
      const message =
        caught instanceof Error && caught.name === "TimeoutError"
          ? "Generation timed out. Your draft is safe; please try again."
          : caught instanceof Error
            ? caught.message
            : "Generation failed. Please try again.";
      setError({ action, message });
      if (message.includes("access code")) setShowUnlock(true);
    } finally {
      if (request.current === controller) {
        request.current = null;
        if (mounted.current) setBusy(null);
      }
    }
  }

  function cancel() {
    request.current?.abort();
    request.current = null;
    setBusy(null);
    setAnnouncement("Generation canceled. Your existing draft is unchanged.");
  }

  function restoreVersion(id: number) {
    const version = versions.find((item) => item.id === id);
    if (!version || busy) return;
    stopPreview();
    sequence.current += 1;
    setVersions((previous) =>
      [{ id: sequence.current, draft }, ...previous.filter((item) => item.id !== id)].slice(0, MAX_VERSIONS),
    );
    setDraft(version.draft);
    setAnnouncement("Previous draft restored. Your other draft is kept in history.");
  }

  function preview() {
    if (previewing) {
      stopPreview();
      return;
    }
    if (!canPreview || !draft.script.trim()) return;
    const utterance = new SpeechSynthesisUtterance(draft.script);
    utterance.lang = "en-GB";
    utterance.rate = 0.95;
    synthesis.current = utterance;
    const finish = () => {
      if (mounted.current && synthesis.current === utterance) {
        synthesis.current = null;
        setPreviewing(false);
      }
    };
    utterance.onend = finish;
    utterance.onerror = (event) => {
      if (
        mounted.current &&
        synthesis.current === utterance &&
        event.error !== "canceled" &&
        event.error !== "interrupted"
      ) {
        setError({
          action: "preview",
          message:
            "Your browser could not play this voice. " +
            "Try another browser or use ElevenLabs MP3 generation when connected.",
        });
      }
      finish();
    };
    setError(null);
    window.speechSynthesis.speak(utterance);
    setPreviewing(true);
  }

  return {
    brief,
    setBrief,
    draft,
    updateScript,
    versions,
    restoreVersion,
    busy,
    error,
    setError,
    audio,
    token,
    setToken,
    showUnlock,
    setShowUnlock,
    announcement,
    previewing,
    canPreview,
    preview,
    generateDraft: () => run("draft"),
    generateSpeech: () => run("speech"),
    cancel,
    retry: () => error && (error.action === "preview" ? preview() : run(error.action)),
    audioIsCurrent: audio?.script === draft.script,
  };
}
