import React from "react";
import Image from "next/image";

interface LogoProps {
  imageSrc: string;
  imageAlt: string;
  className?: string;
  height: number;
  width: number;
}

const Logo: React.FC<LogoProps> = ({
  imageSrc,
  imageAlt,
  className,
  height,
  width,
}) => {
  return (
    <Image
      src={imageSrc}
      alt={imageAlt}
      className={className}
      height={height}
      width={width}
    />
  );
};

export default Logo;
