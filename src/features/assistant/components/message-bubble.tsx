import React from "react";
import { MessageBubbleComponent } from "./message-bubble.styles";
import { MessageBubbleProps } from "./message-bubble.types";

const MessageBubble: React.FC<MessageBubbleProps> = ({ sender, text }) => {
  return <MessageBubbleComponent className={sender === "user" ? "align-end" : ""}>{text}</MessageBubbleComponent>;
};

export default MessageBubble;
