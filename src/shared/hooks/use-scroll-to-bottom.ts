import { useEffect, useRef } from "react";
import { Message } from "@/features/assistant/assistant-model";

export default function useScrollToBottom(messages: Message[], isBotTyping: boolean) {
  const endRef = useRef<HTMLDivElement>(null);
  const previousHeight = useRef(0);
  useEffect(() => {
    const element = endRef.current;
    const container = element?.parentElement;
    if (!element || !container) return;
    const lastMessage = messages[messages.length - 1];
    const nearBottom = previousHeight.current - container.scrollTop - container.clientHeight < 120;
    previousHeight.current = container.scrollHeight;
    if (nearBottom || lastMessage?.sender === "user") {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    }
  }, [messages, isBotTyping]);
  return endRef;
}
