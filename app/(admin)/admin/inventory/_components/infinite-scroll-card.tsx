import { memo } from "react";
import MoreOptions from "./more-options";
import { Card } from "@/components/ui/card";
import Image from "next/image";

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
}> = memo(({ item }) => {
  return (
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
      <MoreOptions
        id={item.id}
        isFeatured={item.isFeatured}
        isPublished={item.isPublished}
      />
    </div>
  );
});
InfiniteScrollCard.displayName = "InfiniteScrollCard";
export default InfiniteScrollCard;
