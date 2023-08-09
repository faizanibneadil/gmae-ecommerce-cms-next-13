"use client";

import {
  connectImageToProductAction,
  disconnectImageToProductAction,
} from "@/_actions";
import Image from "next/image";

interface Props {
  props: {
    image: {
      id: string;
      src: string | null;
    };
    productId: string;
    isGallery: boolean;
  };
}

const Thumbnails: React.FC<Props> = ({ props }) => {
  return (
    <Image
      onClick={
        props.isGallery
          ? () => {
              return connectImageToProductAction({
                imageId: props.image.id,
                productId: props.productId,
              });
            }
          : () => {
              return disconnectImageToProductAction({
                imageId: props.image.id,
                productId: props.productId,
              });
            }
      }
      key={props.image.id}
      alt=""
      width={200}
      height={200}
      src={`https://lh3.googleusercontent.com/d/${props.image.src}=s220`}
      className="object-contain w-full h-20 mb-2 rounded-md"
    />
  );
};

export default Thumbnails;
