import type { Message } from "@/features/chat/chat-model";

export type MessageBubbleProps = Pick<Message, "sender" | "text">;
