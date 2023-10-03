import { memo } from "react";
import MoreOptions from "./more-options";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import Link from "next/link";
import { PencilIcon } from "@/app/_components/icons";
import { Package } from "lucide-react";
import { useParams } from "next/navigation";

interface Image {
  id: string;
  src: string | null;
  searchText: string[];
  altText: string | null;
}

const InfiniteScrollCard: React.FC<{
  item: Image;
}> = memo(({ item }) => {
  const distributionId = useParams()?.distributionId as string;
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="relative w-full h-32">
          <Image
            fill
            sizes="100vw"
            src={`https://lh3.googleusercontent.com/d/${item?.src}=s220`}
            alt=""
            className="object-cover w-full h-20 mb-2 rounded-md"
          />
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-40">
        <Link href={`/distribution/${distributionId}/images/${item.id}`}>
          <ContextMenuItem>
            <PencilIcon className="w-4 h-4 mr-2" /> Properties
          </ContextMenuItem>
        </Link>
        <Link
          href={`/distribution/${distributionId}/images/${item.id}/products`}
        >
          <ContextMenuItem>
            <PencilIcon className="w-4 h-4 mr-2" /> Products
          </ContextMenuItem>
        </Link>
        <Link
          href={`/distribution/${distributionId}/images/${item.id}/categories`}
        >
          <ContextMenuItem>
            <PencilIcon className="w-4 h-4 mr-2" /> Categories
          </ContextMenuItem>
        </Link>
      </ContextMenuContent>
    </ContextMenu>
  );
});
InfiniteScrollCard.displayName = "InfiniteScrollCard";
export default InfiniteScrollCard;
