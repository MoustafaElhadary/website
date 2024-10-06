import clsx from "clsx";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React, { useState } from "react";

interface IBlurImage {
  height?: number;
  width?: number;
  src: string | StaticImport;
  objectFit?: string;
  className?: string;
  alt?: string;
  layout?: string;
}

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  layout,
}: IBlurImage) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={clsx(
        "transition duration-500",
        isLoading ? "blur-sm scale-100" : " blur-0 scale-100",
        className
      )}
      onLoadingComplete={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={src as string}
      layout={layout}
      alt={alt ? alt : "Avatar"}
    />
  );
};
