"use client";
import { X } from "lucide-react";
import { memo, useTransition } from "react";
import Spin from "../../../_components/loading-spinner";
import useCart from "@/store/cart-store";
import { Button } from "@/components/ui/button";

const RemoveToCart: React.FC<{
  productId: string | undefined;
}> = ({ productId }) => {
  const removeToCart = useCart((state) => state.removeProductToCart);
  const [isDecrementing, decrement] = useTransition();
  const action = () => decrement(() => removeToCart(productId));
  return (
    <Button
      onClick={action}
      variant="outline"
      className="w-6 h-6 p-1 cursor-pointer"
      size="sm"
    >
      {isDecrementing ? (
        <Spin className="w-6 h-6" />
      ) : (
        <X className="w-6 h-6" />
      )}
    </Button>
  );
};

export default memo(RemoveToCart);
