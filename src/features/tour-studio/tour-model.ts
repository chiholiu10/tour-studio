export const MAX_BRIEF_LENGTH = 1200;
export const MAX_SCRIPT_LENGTH = 3000;
export const MAX_VERSIONS = 8;

export const locations = {
  canals: { label: "Amsterdam canals", detail: "Water, bridges & a slower pace", number: "01" },
  jordaan: { label: "The Jordaan", detail: "Small streets, big character", number: "02" },
  museum: { label: "Museum Quarter", detail: "Art, architecture & open spaces", number: "03" },
} as const;

export type Location = keyof typeof locations;
export type Tone = "warm" | "cinematic" | "playful";
export type Duration = "30" | "60" | "90";

export interface Brief {
  location: Location;
  tone: Tone;
  duration: Duration;
  direction: string;
}

export interface Draft {
  title: string;
  script: string;
  note: string;
  source: "example" | "ai";
}

export interface StudioCapabilities {
  drafts: boolean;
  speech: boolean;
  accessRequired: boolean;
}

export const initialBrief: Brief = {
  location: "canals",
  tone: "warm",
  duration: "60",
  direction: "",
};

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function parseBrief(value: unknown): Brief {
  if (
    !isRecord(value) ||
    typeof value.location !== "string" ||
    !(value.location in locations) ||
    !["warm", "cinematic", "playful"].includes(String(value.tone)) ||
    !["30", "60", "90"].includes(String(value.duration)) ||
    typeof value.direction !== "string" ||
    value.direction.length > MAX_BRIEF_LENGTH
  ) {
    throw new Error("Choose a location, tone and length, and keep the direction under 1,200 characters.");
  }
  if (!Object.hasOwn(locations, value.location)) throw new Error("Choose a supported location.");
  return {
    location: value.location as Location,
    tone: value.tone as Tone,
    duration: value.duration as Duration,
    direction: value.direction.trim(),
  };
}

export function parseDraft(value: unknown): Draft {
  if (
    !isRecord(value) ||
    typeof value.title !== "string" ||
    !value.title.trim() ||
    value.title.length > 120 ||
    typeof value.script !== "string" ||
    !value.script.trim() ||
    value.script.length > MAX_SCRIPT_LENGTH ||
    typeof value.note !== "string" ||
    value.note.length > 500 ||
    (value.source !== "example" && value.source !== "ai")
  ) {
    throw new Error("The draft was incomplete. Try generating it again.");
  }
  return { title: value.title.trim(), script: value.script.trim(), note: value.note, source: value.source };
}

export function wordCount(text: string): number {
  return text.trim() ? text.trim().split(/\s+/u).length : 0;
}

export function estimatedSeconds(text: string): number {
  return Math.ceil(wordCount(text) / 2.3);
}

export function exportName(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 60) || "tour-script"
  );
}
