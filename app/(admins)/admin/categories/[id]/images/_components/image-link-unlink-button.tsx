"use client";

import {
  connectImageToCategoryAction,
  connectImageToProductAction,
  disconnectImageToProductAction,
} from "@/_actions";
import { Button } from "@/components/ui/button";
import { memo, useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";
import { useParams } from "next/navigation";

const ImageLinkUnlink: React.FC<{
  imageId: string;
  unLinkId: string;
}> = memo(({ imageId, unLinkId }) => {
  const categoryId = useParams()?.id as string;
  const [pending, startTransition] = useTransition();

  const link = () => {
    return startTransition(() => {
      return connectImageToCategoryAction({ imageId, categoryId });
    });
  };

  return (
    <Button
      onClick={link}
      disabled={pending}
      size="sm"
      variant={unLinkId ? "destructive" : "outline"}
    >
      {pending ? <Spin /> : unLinkId ? `Unlink` : `Link`}
    </Button>
  );
});
ImageLinkUnlink.displayName = "ImageLinkUnlink";
export default ImageLinkUnlink;
