import { useEffect, useRef } from "react";
import { MessageBubbleProps } from "../components/atoms/MessageBubble/Message.types";

const useScrollToBottom = (messages: MessageBubbleProps[], input: string) => {
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, input]);

  return endOfMessagesRef;
};

export default useScrollToBottom;
