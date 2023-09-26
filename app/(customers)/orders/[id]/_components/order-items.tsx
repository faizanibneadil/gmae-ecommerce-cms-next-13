import { Card } from "@/components/ui/card";
import Image from "next/image";
import { memo } from "react";

type TItems = {
  Products: {
    title: string | null;
    images: {
      src: string | null;
    }[];
    id: string;
  } | null;
  id: string;
  discount: number;
  quantity: number;
  subtotal: number;
};

const OrderItems: React.FC<{
  items: TItems[] | undefined;
}> = memo(({ items }) => {
  return (
    <div className="w-full">
      <h2 className="mt-4 text-sm font-semibold">Order Items.</h2>
      <Card className="mt-2 divide-y">
        {items?.map((item) => (
          <div key={item.id} className="px-3 py-1 text-left">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="relative w-8 h-8 rounded-full shadow-lg">
                  <Image
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-contain rounded-full"
                    src={`https://lh3.googleusercontent.com/d/${item.Products?.images[0].src}=s220`}
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium line-clamp-3">
                    {item?.Products?.title}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <p className="text-xs">Discount: {item.discount}</p>
                    <p className="text-xs">Sub Total: {item.subtotal}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
});
OrderItems.displayName = "OrderItems";
export default OrderItems;
