import { memo, RefObject } from "react";
import { Message } from "@/features/chat/chat-model";
import { ChatbotScreenComponent } from "./chatbot-screen.styles";
import MessageBubble from "./message-bubble";
import TypingIndicator from "./typing-indicator";

interface ChatbotScreenProps {
  messages: Message[];
  isBotTyping: boolean;
  scrollToBottomRef: RefObject<HTMLDivElement>;
}

function ChatbotScreen({ messages, isBotTyping, scrollToBottomRef }: ChatbotScreenProps) {
  return (
    <ChatbotScreenComponent role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions">
      {messages.map((message) => (
        <MessageBubble key={message.id} sender={message.sender} text={message.text} />
      ))}
      {isBotTyping && <TypingIndicator userType="chatbot" />}
      <div ref={scrollToBottomRef} />
    </ChatbotScreenComponent>
  );
}

export default memo(ChatbotScreen);
