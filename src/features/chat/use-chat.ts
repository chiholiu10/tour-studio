"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { appendMessage, demoReply, Message, normalizeMessage, REPLY_DELAY_MS, ReplyProvider } from "./chat-model";

export function useChat(replyProvider: ReplyProvider = demoReply) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pending = useRef<AbortController | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      pending.current?.abort();
      if (timer.current !== null) clearTimeout(timer.current);
    },
    [],
  );

  const sendMessage = useCallback(() => {
    const text = normalizeMessage(input);
    if (!text || pending.current) return;
    const controller = new AbortController();
    pending.current = controller;
    setMessages((previous) => appendMessage(previous, { id: crypto.randomUUID(), sender: "user", text }));
    setInput("");
    setError(null);
    setIsBotTyping(true);

    timer.current = setTimeout(async () => {
      try {
        const reply = normalizeMessage(await replyProvider(text, controller.signal));
        if (controller.signal.aborted) return;
        if (!reply) throw new Error("Empty reply");
        setMessages((previous) => appendMessage(previous, { id: crypto.randomUUID(), sender: "bot", text: reply }));
      } catch {
        if (!controller.signal.aborted) setError("The reply could not be loaded. Please send your message again.");
      } finally {
        if (!controller.signal.aborted) {
          pending.current = null;
          timer.current = null;
          setIsBotTyping(false);
        }
      }
    }, REPLY_DELAY_MS);
  }, [input, replyProvider]);

  return { messages, input, setInput, sendMessage, isBotTyping, error };
}
