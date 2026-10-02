import { MAX_MESSAGE_LENGTH } from "@/features/assistant/assistant-model";
import { AssistantInputComponent } from "./assistant-input.styles";
import Button from "../../../shared/components/button";
import InputField from "../../../shared/components/input-field";

interface AssistantInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  isBusy: boolean;
}

export default function AssistantInput({ input, onInputChange, onSend, isBusy }: AssistantInputProps) {
  return (
    <AssistantInputComponent
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
        className="assistant-input-field"
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
    </AssistantInputComponent>
  );
}
