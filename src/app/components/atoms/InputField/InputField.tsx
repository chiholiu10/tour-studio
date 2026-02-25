import React from "react";
import { StyledLabel } from "./InputField.styles";
import { useId } from "react";

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  handleSendMessage: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  placeholder,
  handleSendMessage,
  className,
}) => {
  const inputId = useId();

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <StyledLabel htmlFor={"input-" + inputId}>Type your message</StyledLabel>
      <input
        type="text"
        id={"input-" + inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleInputKeyDown}
        placeholder={placeholder}
        className={className}
      />
    </>
  );
};

export default InputField;
