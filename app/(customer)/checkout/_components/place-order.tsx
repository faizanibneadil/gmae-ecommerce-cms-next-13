"use client";

import { Button } from "@/components/ui/button";
import useCart from "@/store/cart-store";
import { memo } from "react";

const PlaceOrder: React.FC<{}> = memo(() => {
  const isSelectAddress = useCart((state) => state.addressId);
  return (
    <Button
      onClick={() => alert("order is ready for place.")}
      disabled={!Boolean(isSelectAddress)}
      className="w-full"
    >
      Place Order
    </Button>
  );
});
PlaceOrder.displayName = "PlaceOrder";
export default PlaceOrder;
