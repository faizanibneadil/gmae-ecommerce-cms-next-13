"use client";

import useCart from "@/store/cart-store";
import { Card, List, ListItem } from "@tremor/react";
import { memo } from "react";

const CartSummary: React.FC<{}> = memo(() => {
  const discount = useCart((state) => state.discount);
  const total = useCart((state) => state.total);
  return (
    <Card className="w-full p-0 mx-auto mt-2 rounded-none">
      <List className="px-2">
        <ListItem>
          <span>Discount:</span>
          <span>{discount}</span>
        </ListItem>
        <ListItem>
          <span>Total:</span>
          <span>{total}</span>
        </ListItem>
      </List>
    </Card>
  );
});

CartSummary.displayName = "CartSummary";
export default CartSummary;
