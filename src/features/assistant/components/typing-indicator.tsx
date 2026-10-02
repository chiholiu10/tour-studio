import React from "react";
import { Bubble, TypingIndicatorComponent } from "./typing-indicator.styles";

interface TypingIndicatorProps {
  userType: "user" | "assistant";
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ userType }) => (
  <TypingIndicatorComponent $userType={userType} role="status" aria-label="Bot is typing">
    <Bubble aria-hidden="true" />
    <Bubble aria-hidden="true" />
    <Bubble aria-hidden="true" />
    <Bubble aria-hidden="true" />
  </TypingIndicatorComponent>
);

export default TypingIndicator;
