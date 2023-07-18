"use client";

import { disconnectImageToProductAction } from "@/_actions";
import { ImageMinus, ImagePlus } from "lucide-react";
import React, { FC, memo, useTransition } from "react";

interface Props {
  imageId: string;
  productId: string;
}

const DisconnectButton: FC<Props> = ({ imageId, productId }) => {
  const [isPending, startTransition] = useTransition();
  const action = () =>
    startTransition(() => disconnectImageToProductAction({ imageId, productId }));
  return (
    <div
      onClick={() => action()}
      className="hidden group-hover:flex flex-col rounded-full absolute inset-0 bg-gray-400/60 z-[20] items-center justify-center"
    >
      {isPending ? (
        <div className="w-4 h-4 rounded-full md:h-6 md:w-6 animate-ping bg-slate-800" />
      ) : (
        <ImageMinus className="w-4 h-4 md:h-6 md:w-6" />
      )}
    </div>
  );
};

export default memo(DisconnectButton);
