"use client";

import { addToCart } from "@/_actions";
import { Badge, Button } from "@tremor/react";
import { ShoppingCart } from "lucide-react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { memo, useTransition } from "react";

type Props = {
  session: Session | null;
  productId: string | undefined;
  slug: string | null | undefined;
};

const AddToCartButton = ({ session, productId, slug }: Props) => {
  const [isPending, startTransition] = useTransition();
  const action = () => {
    return startTransition(() => {
      return addToCart({
        userId: session?.user.id,
        productId: productId,
      });
    });
  };
  const auth = () => signIn("google");
  return (
    <Button
      loading={isPending}
      disabled={isPending}
      onClick={session ? action : auth}
      icon={ShoppingCart}
    >
      Add To Cart
    </Button>
  );
};

export default memo(AddToCartButton);
