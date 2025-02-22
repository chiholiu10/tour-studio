interface ButtonBaseProps {
  onClick?: () => void;
  href?: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}
// Ensure props are NOT present
interface ButtonWithoutImage extends ButtonBaseProps {
  imageSrc?: never;
  imageAlt?: never;
  imageClassName?: never;
  width?: number;
  height?: number;
}
// Ensure props are present
interface ButtonWithImage extends ButtonBaseProps {
  imageSrc: string;
  imageAlt: string;
  width: number;
  height: number;
  imageClassName?: string;
}

export type ButtonProps = ButtonWithoutImage | ButtonWithImage;
