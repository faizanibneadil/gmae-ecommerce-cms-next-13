import { Badge } from "@tremor/react";
import { ImageMinus, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC, memo } from "react";
import DisconnectButton from "./disconnect-button";

interface Props {
  image: {
    id: string;
    src: string;
    order: number;
  };
  index: number;
  imageId: string;
  productId: string;
}

const ImagesFormListItem: FC<Props> = ({
  image,
  index,
  imageId,
  productId,
}) => {
  return (
    <div
      className="relative w-10 h-10 cursor-pointer group md:w-20 md:h-20"
      style={{ zIndex: `${index * 10}` }}
    >
      <DisconnectButton imageId={imageId} productId={productId} />
      <Image
        alt=""
        fill
        src={`https://drive.google.com/thumbnail?id=${image.src}&sz=w280`}
        className="object-cover rounded-full shadow-lg ring-2 ring-white"
      />
    </div>
  );
};

export default memo(ImagesFormListItem);
