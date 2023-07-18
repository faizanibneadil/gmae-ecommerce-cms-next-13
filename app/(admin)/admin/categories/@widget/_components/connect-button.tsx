"use client";

import { connectImageToCategoryAction } from "@/_actions";
import { ImagePlus } from "lucide-react";
import React, { FC, memo, useTransition } from "react";

interface Props {
  imageId: string;
  categoryId: string;
}

const ConnectButton: FC<Props> = ({ imageId, categoryId }) => {
  const [isPending, startTransition] = useTransition();
  const action = () =>
    startTransition(() => connectImageToCategoryAction({ imageId, categoryId }));
  return (
    <div
      onClick={() => action()}
      className="hidden group-hover:flex flex-col rounded-md absolute inset-0 bg-gray-400/60 z-[20] items-center justify-center"
    >
      {isPending ? (
        <div className="w-4 h-4 rounded-md md:h-6 md:w-6 animate-ping bg-slate-800" />
      ) : (
        <ImagePlus className="w-4 h-4 md:h-6 md:w-6" />
      )}
    </div>
  );
};

export default memo(ConnectButton);
