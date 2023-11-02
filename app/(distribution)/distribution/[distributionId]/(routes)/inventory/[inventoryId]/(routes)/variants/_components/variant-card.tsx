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
import {
  $linkVariantWithProduct,
  $unLinkVariantWithProduct,
} from "@/mutations";
import { ImageIcon, Link, Unlink } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface Props {
  variant: {
    images: {
      src: string | null;
    }[];
    id: string;
    title: string | null;
  };
}

const VariantCard: React.FC<Props> = ({ variant }) => {
  const values = {
    productId: useParams()?.inventoryId as string,
    variantId: variant.id,
  };

  const connect = () => {
    return toast.promise($linkVariantWithProduct(values), {
      loading: "Linking...",
      success: "Linked Successfully.",
      error: (data) => data.toString(),
    });
  };

  const disConnect = () => {
    return toast.promise($unLinkVariantWithProduct(values), {
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
            src={`https://lh3.googleusercontent.com/d/${variant.images[0].src}=s220`}
            alt=""
            className="object-contain w-full h-20 mb-2 rounded-md"
          />
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-40">
        <ContextMenuItem className="cursor-pointer" onClick={connect}>
          <Link className="w-4 h-4 mr-2" /> Link Variant
        </ContextMenuItem>
        <ContextMenuItem className="cursor-pointer" onClick={disConnect}>
          <Unlink className="w-4 h-4 mr-2" /> Unlink Variant
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default VariantCard;
