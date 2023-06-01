"use client";

import { CldImage } from "next-cloudinary";

export default function CustomImage({
  ...props
}: {
  src: string;
  height: number;
  width: number;
  alt: string;
  className?: string;
  crop?: string;
  gravity?: string;
}) {
  return <CldImage {...props} />;
}
