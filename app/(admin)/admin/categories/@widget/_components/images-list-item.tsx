import { Badge } from "@tremor/react";
import { ImagePlus, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC, memo } from "react";
import ConnectButton from "./connect-button";

interface Props {
  image: {
    id: string;
    src: string;
  };
  index: number;
  categoryId: string;
  imageId: string;
}

const ImagesListItem: FC<Props> = ({ image, index, imageId, categoryId }) => {
  return (
    <div className="relative w-full h-10 cursor-pointer group md:w-full md:h-20">
      <ConnectButton imageId={imageId} categoryId={categoryId} />
      <Image
        alt=""
        fill
        src={`https://drive.google.com/thumbnail?id=${image.src}&sz=w280`}
        className="object-cover rounded-md shadow-lg ring-2 ring-white"
      />
    </div>
  );
};

export default memo(ImagesListItem);
