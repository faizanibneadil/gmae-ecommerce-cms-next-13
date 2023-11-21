import { memo } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
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
import { PencilIcon } from "@/app/_components/icons";
import Link from "next/link";
import { ListChecks } from "lucide-react";

interface InfiniteScrollCardTypes {
  title: string | null;
  images: {
    id: string;
    src: string | null;
  }[];
  id: string;
  isPublished: boolean | null;
  isFeatured: boolean | null;
  stock: number | null;
}

const InfiniteScrollCard: React.FC<{
  item: InfiniteScrollCardTypes;
  did: string;
}> = memo(({ item, did }) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex flex-col space-y-1">
          <Card className="relative w-full h-32">
            <Image
              fill
              sizes="100vw"
              src={`https://lh3.googleusercontent.com/d/${item?.images[0]?.src}=s220`}
              alt=""
              className="object-cover w-full h-20 mb-2 rounded-md"
            />
          </Card>
          <h2 className="text-sm line-clamp-2">{item.title}</h2>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-40">
        <Link href={`/d/${did}/inventory/${item.id}/images`}>
          <ContextMenuItem className="cursor-pointer">
            <PencilIcon className="w-4 h-4 mr-2" /> Images
          </ContextMenuItem>
        </Link>
        <Link href={`/d/${did}/inventory/${item.id}/categories`}>
          <ContextMenuItem className="cursor-pointer">
            <ListChecks className="w-4 h-4 mr-2" /> Categories
          </ContextMenuItem>
        </Link>
        <Link href={`/d/${did}/inventory/${item.id}/companies`}>
          <ContextMenuItem>
            <PencilIcon className="w-4 h-4 mr-2" /> Companies
          </ContextMenuItem>
        </Link>
        <Link href={`/d/${did}/inventory/${item.id}/seo`}>
          <ContextMenuItem>
            <PencilIcon className="w-4 h-4 mr-2" /> SEO
          </ContextMenuItem>
        </Link>
        <Link href={`/d/${did}/inventory/${item.id}/attributes`}>
          <ContextMenuItem>
            <PencilIcon className="w-4 h-4 mr-2" /> Attributes
          </ContextMenuItem>
        </Link>
        <Link href={`/d/${did}/inventory/${item.id}/`}>
          <ContextMenuItem>
            <PencilIcon className="w-4 h-4 mr-2" /> Properties
          </ContextMenuItem>
        </Link>
        <Link href={`/d/${did}/inventory/${item.id}/variants`}>
          <ContextMenuItem>
            <PencilIcon className="w-4 h-4 mr-2" /> Variants
          </ContextMenuItem>
        </Link>
      </ContextMenuContent>
    </ContextMenu>
  );
});
InfiniteScrollCard.displayName = "InfiniteScrollCard";
export default InfiniteScrollCard;
