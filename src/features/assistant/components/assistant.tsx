"use client";

import { useRef } from "react";
import Draggable from "react-draggable";
import { useAssistant } from "@/features/assistant/use-assistant";
import { ReplyProvider } from "@/features/assistant/assistant-model";
import { AssistantComponent } from "./assistant.styles";
import AssistantFooter from "./assistant-footer";
import AssistantHeader from "./assistant-header";
import AssistantInput from "./assistant-input";
import AssistantScreen from "./assistant-screen";
import useScrollToBottom from "../../../shared/hooks/use-scroll-to-bottom";

interface AssistantProps {
  replyProvider?: ReplyProvider;
}

export default function Assistant({ replyProvider }: AssistantProps) {
  const { messages, input, setInput, sendMessage, isBotTyping, error } = useAssistant(replyProvider);
  const scrollToBottomRef = useScrollToBottom(messages, isBotTyping);
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable nodeRef={nodeRef} handle=".handle" cancel="button, a" bounds="parent">
      <AssistantComponent ref={nodeRef} role="region" aria-label="Tours and Tickets demo chat">
        <AssistantHeader />
        <AssistantScreen messages={messages} isBotTyping={isBotTyping} scrollToBottomRef={scrollToBottomRef} />
        {error && <p role="alert">{error}</p>}
        <AssistantInput input={input} onInputChange={setInput} onSend={sendMessage} isBusy={isBotTyping} />
        <AssistantFooter />
      </AssistantComponent>
    </Draggable>
  );
}
