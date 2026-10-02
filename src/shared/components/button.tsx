import Image from "next/image";
import { ButtonProps } from "./button.types";

export default function Button(props: ButtonProps) {
  const { imageSrc, imageAlt = "", imageClassName, width = 20, height = 20, children, ...rest } = props;
  const content = (
    <>
      {imageSrc && <Image src={imageSrc} alt={imageAlt} className={imageClassName} width={width} height={height} />}
      {children}
    </>
  );
  if (rest.href !== undefined) {
    return (
      <a {...rest} rel={rest.target === "_blank" ? "noopener noreferrer" : rest.rel}>
        {content}
      </a>
    );
  }
  return (
    <button {...rest} type={rest.type ?? "button"}>
      {content}
    </button>
  );
}
