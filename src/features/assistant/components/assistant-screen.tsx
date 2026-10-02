import { memo, RefObject } from "react";
import { Message } from "@/features/assistant/assistant-model";
import { AssistantScreenComponent } from "./assistant-screen.styles";
import MessageBubble from "./message-bubble";
import TypingIndicator from "./typing-indicator";

interface AssistantScreenProps {
  messages: Message[];
  isBotTyping: boolean;
  scrollToBottomRef: RefObject<HTMLDivElement>;
}

function AssistantScreen({ messages, isBotTyping, scrollToBottomRef }: AssistantScreenProps) {
  return (
    <AssistantScreenComponent role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions">
      {messages.map((message) => (
        <MessageBubble key={message.id} sender={message.sender} text={message.text} />
      ))}
      {isBotTyping && <TypingIndicator userType="assistant" />}
      <div ref={scrollToBottomRef} />
    </AssistantScreenComponent>
  );
}

export default memo(AssistantScreen);
