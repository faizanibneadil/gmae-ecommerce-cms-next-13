"use client";
import { Plus } from "lucide-react";
import { memo, useTransition } from "react";
import Spin from "../../../_components/loading-spinner";
import useCart from "@/store/cart-store";
import { Button } from "@/components/ui/button";

const IncrementToCart: React.FC<{
  product: {
    id: string | undefined;
    title: string | null | undefined;
    regularPrice: number | null | undefined;
    salePrice: number | null | undefined;
    purchaseLimit: number | null | undefined;
    image: string | null | undefined;
    qty?: number | undefined;
    discount?: number | undefined;
    subtotal?: number | undefined;
  };
}> = ({ product }) => {
  const incToCart = useCart((state) => state.addToCart);
  const maxBuyLimit = useCart((state) => state.getCartItem(product.id)?.qty);
  const [isIncrementing, increment] = useTransition();
  const action = () => increment(() => incToCart(product));
  return (
    <Button
      disabled={maxBuyLimit === product.purchaseLimit}
      onClick={action}
      variant="outline"
      size="sm"
      className="w-6 h-6 p-1 cursor-pointer"
    >
      {isIncrementing ? (
        <Spin className="w-6 h-6" />
      ) : (
        <Plus className="w-6 h-6" />
      )}
    </Button>
  );
};

export default memo(IncrementToCart);
