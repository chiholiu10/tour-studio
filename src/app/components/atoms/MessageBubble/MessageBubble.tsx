import React from "react";
import { MessageBubbleComponent } from "./MessageBubble.styles";
import { MessageBubbleProps } from "./Message.types";

const MessageBubble: React.FC<MessageBubbleProps> = ({ sender, text }) => {
  return (
    <MessageBubbleComponent className={sender === "user" ? "align-end" : ""}>
      {text}
    </MessageBubbleComponent>
  );
};

export default MessageBubble;
