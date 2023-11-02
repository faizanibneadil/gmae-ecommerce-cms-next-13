"use client";
import { Card } from "@/components/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { $linkImagesWithProduct, $unLinkImagesWithProduct } from "@/mutations";
import { ImageIcon, Link, Unlink } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface Props {
  image: {
    id: string;
    src: string | null;
    searchText: string[];
    altText: string | null;
  };
}

const ImageCard: React.FC<Props> = ({ image }) => {
  const values = {
    productId: useParams()?.inventoryId as string,
    imageId: image.id,
  };

  const connect = () => {
    return toast.promise($linkImagesWithProduct(values), {
      loading: "Linking...",
      success: "Linked Successfully.",
      error: (data) => data.toString(),
    });
  };

  const disConnect = () => {
    return toast.promise($unLinkImagesWithProduct(values), {
      loading: "Unlinking...",
      success: "Unlinked Successfully.",
      error: (data) => data.toString(),
    });
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="relative w-full h-32">
          <Image
            fill
            sizes="100vh"
            src={`https://lh3.googleusercontent.com/d/${image.src}=s220`}
            alt=""
            className="object-contain w-full h-20 mb-2 rounded-md"
          />
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-40">
        <ContextMenuItem className="cursor-pointer" onClick={connect}>
          <Link className="w-4 h-4 mr-2" /> Link Image
        </ContextMenuItem>
        <ContextMenuItem className="cursor-pointer" onClick={disConnect}>
          <Unlink className="w-4 h-4 mr-2" /> Unlink Image
        </ContextMenuItem>
        <ContextMenuItem className="cursor-pointer">
          <ImageIcon className="w-4 h-4 mr-2" /> Make Featured
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ImageCard;
