"use client";

import {
  connectImageToProductAction,
  disconnectImageToProductAction,
} from "@/_actions";
import { Button } from "@/components/ui/button";
import { memo, useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const ImageLinkUnlink: React.FC<{
  imageId: string;
  unLinkId: string;
}> = memo(({ imageId, unLinkId }) => {
  const productId = useParams()?.id as string;
  const [pending, startTransition] = useTransition();

  const link = () => {
    // @ts-ignore
    startTransition(() => {
      toast.promise(connectImageToProductAction({ imageId, productId }), {
        loading: "Linking...",
        success: "Linked successfully.",
        error: "Something went wrong.",
        action: {
          label: "Undo",
          onClick: () => link(),
        },
      });
    });
  };

  const unLink = () => {
    // @ts-ignore
    startTransition(() => {
      toast.promise(disconnectImageToProductAction({ imageId, productId }), {
        loading: "Un Linking...",
        success: "Unlinked successfully.",
        error: "Something went wrong.",
        action: {
          label: "Undo",
          onClick: () => link(),
        },
      });
    });
  };
  return (
    <Button
      onClick={unLinkId ? unLink : link}
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
