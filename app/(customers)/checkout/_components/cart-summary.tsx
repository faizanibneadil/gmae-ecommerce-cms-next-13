"use client";

import { Card } from "@/components/ui/card";
import useCart from "@/store/cart-store";
import { memo } from "react";

const CartSummary: React.FC<{}> = memo(() => {
  const discount = useCart((state) => state.discount);
  const total = useCart((state) => state.total);
  return (
    <Card className="w-full p-0 mx-auto mt-2 rounded-none">
      <div className="px-2">
        <div>
          <span>Discount:</span>
          <span>{discount}</span>
        </div>
        <div>
          <span>Total:</span>
          <span>{total}</span>
        </div>
      </div>
    </Card>
  );
});

CartSummary.displayName = "CartSummary";
export default CartSummary;
