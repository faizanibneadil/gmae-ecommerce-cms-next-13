"use client";

import {
  connectImageToProductAction,
  disconnectImageToProductAction,
} from "@/_actions";
import Image from "next/image";
import ConnectImage from "./connect-button";
import DisconnectImage from "./disconnect-button";
import { Card } from "@tremor/react";

const Thumbnails: React.FC<{
  connectProductId: string;
  image: {
    src: string | null;
    Products: {
      id: string;
    }[];
    id: string;
  };
}> = ({ image, connectProductId }) => {
  return (
    <div className="flex flex-col space-y-1">
      <Card className="relative w-full h-32">
        <Image
          fill
          sizes="100vh"
          src={`https://lh3.googleusercontent.com/d/${image.src}=s220`}
          alt=""
          className="object-contain w-full h-20 mb-2 rounded-md"
        />
      </Card>
      {image?.Products[0]?.id ? (
        <DisconnectImage imageId={image.id} productId={image.Products[0]?.id} />
      ) : (
        <ConnectImage imageId={image.id} productId={connectProductId} />
      )}
    </div>
  );
};

export default Thumbnails;
