"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { addToCart } from "@/_actions";
import useCart from "@/store/cart-store";
import { Hash, ShoppingCart } from "lucide-react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { memo, useTransition } from "react";

type Props = {
  session: Session | null;
  product: {
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
  } | null;
  slug: string | null | undefined;
};

const AddToCartButton = ({ session, product, slug }: Props) => {
  const addToCart = useCart((state) => state.addToCart);
  const currantItem = useCart((state) => state.currantItem(product?.id));
  const [isPending, startTransition] = useTransition();
  const action = () => {
    return startTransition(() => {
      return addToCart({
        id: product?.id,
        regularPrice: product?.regularPrice,
        salePrice: product?.salePrice,
        title: product?.title,
        image: product?.images[0]?.src,
      });
    });
  };
  const auth = () => signIn("google");
  return (
    <Button
      disabled={isPending || currantItem?.qty === product?.purchaseLimit}
      onClick={session ? action : auth}
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
};

export default memo(AddToCartButton);
