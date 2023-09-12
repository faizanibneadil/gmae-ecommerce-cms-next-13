"use client";
import { Minus } from "lucide-react";
import { memo, useTransition } from "react";
import Spin from "../../../_components/loading-spinner";
import useCart from "@/store/cart-store";
import { Button } from "@/components/ui/button";

const DecrementToCart: React.FC<{
  productId: string | undefined;
}> = ({ productId }) => {
  const decToCart = useCart((state) => state.decrementToCart);
  const [isDecrementing, decrement] = useTransition();
  const action = () => decrement(() => decToCart(productId));
  return (
    <Button
      onClick={action}
      variant="outline"
      size="sm"
      className="cursor-pointer p-1 w-6 h-6"
    >
      {isDecrementing ? (
        <Spin className="w-6 h-6" />
      ) : (
        <Minus className="w-6 h-6" />
      )}
    </Button>
  );
};

export default memo(DecrementToCart);
