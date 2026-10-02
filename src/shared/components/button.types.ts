import { ComponentPropsWithoutRef } from "react";

interface ImageProps {
  imageSrc?: string;
  imageAlt?: string;
  imageClassName?: string;
  width?: number;
  height?: number;
}

export type ButtonProps = ImageProps &
  (
    | (ComponentPropsWithoutRef<"button"> & { href?: never })
    | (ComponentPropsWithoutRef<"a"> & { href: string; disabled?: never })
  );
