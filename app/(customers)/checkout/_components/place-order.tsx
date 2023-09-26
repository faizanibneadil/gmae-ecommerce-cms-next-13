"use client";

import { placeOrder } from "@/_actions";
import { Button } from "@/components/ui/button";
import useCart from "@/store/cart-store";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { memo, useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";

const PlaceOrder: React.FC<{
  session: Session | null;
}> = memo(({ session }) => {
  const { replace } = useRouter();
  const [pending, start] = useTransition();
  const isSelectAddress = useCart((state) => state.addressId);
  const cartItems = useCart((state) => state.items);
  const addressId = useCart((state) => state.addressId);
  const totalDiscount = useCart((state) => state.discount);
  const cartTotal = useCart((state) => state.total);
  const action = () => {
    return start(async () => {
      const id = await placeOrder({
        addressId,
        cartItems,
        cartTotal,
        totalDiscount,
        session,
      });
      replace(`/orders/${id}`);
    });
  };
  return session ? (
    <Button
      onClick={action}
      disabled={!Boolean(isSelectAddress) || !Boolean(cartItems.length)}
      className="w-full"
    >
      {pending ? <Spin /> : "Place Order"}
    </Button>
  ) : (
    <Button onClick={() => signIn("google")} className="w-full">
      SignIn with Google
    </Button>
  );
});
PlaceOrder.displayName = "PlaceOrder";
export default PlaceOrder;
