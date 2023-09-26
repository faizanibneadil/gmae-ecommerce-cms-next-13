"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useCart from "@/store/cart-store";
import { ShoppingCart } from "lucide-react";
import { memo, useTransition } from "react";

type TItem = {
  images: {
    src: string | null;
  }[];
  id: string;
  title: string | null;
  slug: string | null;
  description: string | null;
  regularPrice: number | null;
  salePrice: number | null;
  purchaseLimit: number | null;
};

const AddToCartButton: React.FC<{
  product: TItem | null;
}> = memo(({ product }) => {
  const addToCart = useCart((state) => state.addToCart);
  const currantItem = useCart((state) => state.getCartItem(product?.id));
  const [isPending, startTransition] = useTransition();
  const action = () => {
    return startTransition(() => {
      return addToCart({
        id: product?.id,
        regularPrice: product?.regularPrice,
        salePrice: product?.salePrice,
        title: product?.title,
        image: product?.images[0]?.src,
        purchaseLimit: product?.purchaseLimit,
      });
    });
  };

  return (
    <Button
      disabled={isPending || currantItem?.qty === product?.purchaseLimit}
      onClick={action}
    >
      {currantItem?.qty === product?.purchaseLimit ? (
        `Maximum Limit`
      ) : (
        <div className="flex flex-row items-center space-x-2">
          <ShoppingCart /> <span>Add To Cart</span>
        </div>
      )}
      {currantItem?.qty && <Badge className="ml-2">{currantItem?.qty}</Badge>}
    </Button>
  );
});
AddToCartButton.displayName = "AddToCartButton";
export default AddToCartButton;
