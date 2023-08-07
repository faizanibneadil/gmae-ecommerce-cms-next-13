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
  quantity: number | null | undefined;
  slug: string | null | undefined;
};

const AddToCartButton = ({ session, productId, quantity, slug }: Props) => {
  const [isPending, startTransition] = useTransition();
  const action = () => {
    return startTransition(() => {
      return addToCart({
        userId: session?.user.id,
        productId: productId,
        slug: slug,
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
      {quantity ? (
        <div className="space-x-2">
          <span>Add one more</span>
          <Badge size="xs">{quantity}</Badge>
        </div>
      ) : (
        `Add To Cart`
      )}
    </Button>
  );
};

export default memo(AddToCartButton);
