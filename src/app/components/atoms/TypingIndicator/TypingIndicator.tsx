import React from "react";
import { Bubble, TypingIndicatorComponent } from "./TypingIndicator.styles";

interface TypingIndicatorProps {
  userType: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ userType }) => (
  <TypingIndicatorComponent $userType={userType}>
    <Bubble />
    <Bubble />
    <Bubble />
    <Bubble />
  </TypingIndicatorComponent>
);

export default TypingIndicator;
