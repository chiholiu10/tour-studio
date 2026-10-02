import type { Message } from "@/features/assistant/assistant-model";

export type MessageBubbleProps = Pick<Message, "sender" | "text">;
