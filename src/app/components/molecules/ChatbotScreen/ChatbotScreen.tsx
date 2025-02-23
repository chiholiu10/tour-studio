import React from "react";
import { MessageBubbleProps } from "../../atoms/MessageBubble/Message.types";
import { ChatbotScreenComponent } from "./ChatbotScreen.styles";
import MessageBubble from "../../atoms/MessageBubble/MessageBubble";
import TypingIndicator from "../../atoms/TypingIndicator/TypingIndicator";

interface ChatbotMessageScreenProps {
  messages: MessageBubbleProps[];
  isUserTyping: boolean;
  isBotTyping: boolean;
  scollToBottomRef: React.RefObject<HTMLDivElement>;
}

const ChatbotScreen: React.FC<ChatbotMessageScreenProps> = ({
  messages,
  isUserTyping,
  isBotTyping,
  scollToBottomRef,
}) => (
  <ChatbotScreenComponent>
    {messages.map((message, index) => (
      <MessageBubble key={index} sender={message.sender} text={message.text} />
    ))}
    {(isUserTyping || isBotTyping) && (
      <TypingIndicator userType={isUserTyping ? "user" : "chatbot"} />
    )}
    <div ref={scollToBottomRef} />
  </ChatbotScreenComponent>
);

export default ChatbotScreen;
