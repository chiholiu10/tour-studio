export const MAX_MESSAGE_LENGTH = 2000;
export const MAX_MESSAGES = 200;
export const REPLY_DELAY_MS = 1200;

export interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}

export type ReplyProvider = (message: string, signal: AbortSignal) => Promise<string>;

export function normalizeMessage(value: string): string {
  return value.trim().slice(0, MAX_MESSAGE_LENGTH);
}

export function appendMessage(messages: Message[], message: Message): Message[] {
  return [...messages, message].slice(-MAX_MESSAGES);
}

// This is a local demo. A production provider must validate its response and
// keep credentials, authorization and rate limiting on the server.
export const demoReply: ReplyProvider = async () =>
  "Thanks for your message! This is a demo assistant. For bookings, please visit Tours & Tickets.";
