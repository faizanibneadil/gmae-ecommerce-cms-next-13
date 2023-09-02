import { memo } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { priceFormatter } from "@/lib/utils";

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
  regularPrice: number | null;
  salePrice: number | null;
}

const InfiniteScrollCard: React.FC<{
  item: InfiniteScrollCardTypes;
}> = memo(({ item }) => {
  const calculatePercentage = (
    regularPrice: number,
    salePrice: number
  ): number => {
    const discount = regularPrice - salePrice;
    const percentage = (discount / regularPrice) * 100;
    return Number(percentage.toFixed());
  };
  const off = calculatePercentage(
    Number(item.regularPrice),
    Number(item.salePrice)
  );
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
        {off > 0 && (
          <Badge className="absolute bottom-1 left-1" variant="destructive">
            {`${off}% OFF`}
          </Badge>
        )}
      </Card>
      <h2 className="text-sm line-clamp-2">{item.title}</h2>
      <div className="flex flex-row items-center justify-between">
        <Badge className="">
          {priceFormatter.format(Number(item.salePrice))}
        </Badge>
      </div>
    </div>
  );
});
InfiniteScrollCard.displayName = "InfiniteScrollCard";
export default InfiniteScrollCard;
