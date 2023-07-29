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
    <div key={image.id} className="relative w-12 h-12">
      <Image
        // loader={imageLoader}
        alt=""
        fill
        src={`https://drive.google.com/thumbnail?id=${image.src}&sz=w120`}
        className="object-cover"
      />
    </div>
  );
};

export default memo(ProductsImagesListItem);
