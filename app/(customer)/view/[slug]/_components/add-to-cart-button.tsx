"use client";

// import { addToCart } from "@/_actions";
import useCart from "@/store/cart-store";
import { Badge, Button, NumberInput } from "@tremor/react";
import { Hash, ShoppingCart } from "lucide-react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { memo, useTransition } from "react";

type Props = {
  session: Session | null;
  product: {
    Attributes: {
      id: string;
      name: string | null;
      value: string | null;
    }[];
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
      loading={isPending}
      disabled={isPending || currantItem?.qty === product?.purchaseLimit}
      onClick={session ? action : auth}
      icon={ShoppingCart}
    >
      {currantItem?.qty === product?.purchaseLimit
        ? `Maximum Limit`
        : `Add To Cart`}
      {currantItem?.qty && (
        <Badge size="xs" className="ml-2">
          {currantItem?.qty}
        </Badge>
      )}
    </Button>
  );
};

export default memo(AddToCartButton);
