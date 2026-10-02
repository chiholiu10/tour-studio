import { MAX_MESSAGE_LENGTH } from "@/features/chat/chat-model";
import { ChatbotInputComponent } from "./chatbot-input.styles";
import Button from "../../../shared/components/button";
import InputField from "../../../shared/components/input-field";

interface ChatbotInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  isBusy: boolean;
}

export default function ChatbotInput({ input, onInputChange, onSend, isBusy }: ChatbotInputProps) {
  return (
    <ChatbotInputComponent
      as="form"
      onSubmit={(event) => {
        event.preventDefault();
        onSend();
      }}
    >
      <InputField
        value={input}
        onChange={onInputChange}
        placeholder="Type and press [enter]"
        className="chatbot-input-field"
        maxLength={MAX_MESSAGE_LENGTH}
      />
      <Button
        type="submit"
        disabled={isBusy || !input.trim()}
        aria-label="Send message"
        imageSrc="/images/send.png"
        imageAlt=""
        className="send-icon"
        width={15}
        height={15}
      />
    </ChatbotInputComponent>
  );
}
