"use client";

import { useRef } from "react";
import Draggable from "react-draggable";
import { useChat } from "@/features/chat/use-chat";
import { ReplyProvider } from "@/features/chat/chat-model";
import { ChatbotComponent } from "./chatbot.styles";
import ChatbotFooter from "./chatbot-footer";
import ChatbotHeader from "./chatbot-header";
import ChatbotInput from "./chatbot-input";
import ChatbotScreen from "./chatbot-screen";
import useScrollToBottom from "../../../shared/hooks/use-scroll-to-bottom";

interface ChatbotProps {
  replyProvider?: ReplyProvider;
}

export default function Chatbot({ replyProvider }: ChatbotProps) {
  const { messages, input, setInput, sendMessage, isBotTyping, error } = useChat(replyProvider);
  const scrollToBottomRef = useScrollToBottom(messages, isBotTyping);
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable nodeRef={nodeRef} handle=".handle" cancel="button, a" bounds="parent">
      <ChatbotComponent ref={nodeRef} role="region" aria-label="Tours and Tickets demo chat">
        <ChatbotHeader />
        <ChatbotScreen messages={messages} isBotTyping={isBotTyping} scrollToBottomRef={scrollToBottomRef} />
        {error && <p role="alert">{error}</p>}
        <ChatbotInput input={input} onInputChange={setInput} onSend={sendMessage} isBusy={isBotTyping} />
        <ChatbotFooter />
      </ChatbotComponent>
    </Draggable>
  );
}
