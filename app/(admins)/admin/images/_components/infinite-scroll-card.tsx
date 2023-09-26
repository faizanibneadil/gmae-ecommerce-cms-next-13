import { memo } from "react";
import MoreOptions from "./more-options";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface Image {
  id: string;
  src: string | null;
  searchText: string[];
  altText: string | null;
}

const InfiniteScrollCard: React.FC<{
  item: Image;
}> = memo(({ item }) => {
  return (
    <div className="flex flex-col space-y-1">
      <Card className="relative w-full h-32">
        <Image
          fill
          sizes="100vw"
          src={`https://lh3.googleusercontent.com/d/${item?.src}=s220`}
          alt=""
          className="object-cover w-full h-20 mb-2 rounded-md"
        />
      </Card>
      <MoreOptions id={item.id} />
    </div>
  );
});
InfiniteScrollCard.displayName = "InfiniteScrollCard";
export default InfiniteScrollCard;
