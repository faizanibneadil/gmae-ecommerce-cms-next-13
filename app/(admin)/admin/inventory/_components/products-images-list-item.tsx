// "use client";
import Image from "next/image";
import { FC, memo } from "react";

interface Props {
  image: {
    id: string;
    src: string | null;
  };
}

const ProductsImagesListItem: FC<Props> = ({ image }) => {
  // const imageLoader = ({ src }: { src: string }) => {
  //   return `https://drive.google.com/thumbnail?id=${src}&sz=w120`;
  // };
  return (
    <div key={image.id} className="relative w-10 h-10">
      <Image
        // loader={imageLoader}
        alt=""
        fill
        src={`https://drive.google.com/thumbnail?id=${image.src}&sz=w120`}
        className="object-cover rounded-full shadow-lg ring-1 ring-white"
      />
    </div>
  );
};

export default memo(ProductsImagesListItem);
