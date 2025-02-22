import React from "react";
import { ButtonProps } from "./Button.types";
import Image from "next/image";

const Button: React.FC<ButtonProps> = ({
  onClick,
  href,
  disabled,
  children,
  imageSrc,
  imageAlt,
  className,
  imageClassName,
  width,
  height,
}) => {
  const buttonContent = (
    <>
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={imageAlt}
          className={imageClassName}
          width={width}
          height={height} // needed in NextJS Image
        />
      )}
      {children}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {buttonContent}
      </a>
    );
  }

  const buttonProps = {
    className,
    onClick,
    ...(disabled && className === "send-icon" && { disabled: true }),
  };

  return <button {...buttonProps}>{buttonContent}</button>;
};

export default Button;
