import { ComponentPropsWithoutRef, useId } from "react";
import { StyledLabel } from "./input-field.styles";

interface InputFieldProps extends Omit<ComponentPropsWithoutRef<"input">, "onChange"> {
  onChange: (value: string) => void;
  label?: string;
}

export default function InputField({ onChange, label = "Type your message", id, ...props }: InputFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <>
      <StyledLabel htmlFor={inputId}>{label}</StyledLabel>
      <input
        {...props}
        id={inputId}
        type="text"
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          props.onKeyDown?.(event);
          if (event.key === "Enter" && event.nativeEvent.isComposing) event.preventDefault();
        }}
      />
    </>
  );
}
