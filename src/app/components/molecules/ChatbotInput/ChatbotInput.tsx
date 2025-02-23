import React from "react";
import { ChatbotInputComponent } from "./ChatbotInput.styles";
import { Button, InputField } from "../../atoms";

interface ChatbotInputProps {
  input: string;
  handleInputChange: (value: string) => void;
  handleSendMessage: () => void;
  isUserTyping: boolean;
}

const ChatbotInput: React.FC<ChatbotInputProps> = ({
  input,
  handleInputChange,
  handleSendMessage,
  isUserTyping,
}) => (
  <ChatbotInputComponent>
    <InputField
      value={input}
      onChange={handleInputChange}
      placeholder="Type and press [enter]"
      className="chatbot-input-field"
      handleSendMessage={handleSendMessage}
    />
    <Button
      onClick={handleSendMessage}
      disabled={!isUserTyping}
      imageSrc="/images/send.png"
      imageAlt="send-icon"
      className="send-icon"
      width={15}
      height={15}
    />
  </ChatbotInputComponent>
);

export default ChatbotInput;
