"use client";

import { addToFavorite } from "@/_actions";
import { Icon } from "@tremor/react";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


interface Props {
  product: {
    id: string;
    title: string | null;
    slug: string | null;
    images: {
      src: string | null;
    }[];
  };
  userId?: string;
}

export default function ProductCard({ product, userId }: Props) {
  return (
    <Link href={`/${product.slug}`} className="rounded-lg shadow-md">
      <div className="relative w-full h-32">
        <Image
          className="object-contain"
          fill
          alt=""
          src={`https://lh3.googleusercontent.com/d/${product?.images[0]?.src}=s220`}
        />
        <Icon
          onClick={() => addToFavorite(product.id, userId)}
          icon={Heart}
          variant="solid"
          color="rose"
          size="xs"
          className="absolute cursor-pointer top-2 right-2"
        />
      </div>
      <div className="p-2 mt-2">
        <h2 className="line-clamp-2">{product.title}</h2>
        {/* <div className="flex items-center justify-between mt-4 space-x-2">
          <div className="flex flex-col items-center text-left">
            <span className="text-xs font-medium line-through oldstyle-nums">
              Rs: {product.regularPrice}
            </span>
            <span className="text-sm font-medium oldstyle-nums">
              Rs: {product.salePrice}
            </span>
          </div>
          <Button variant="primary" className="p-2 font-bold">
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div> */}
      </div>
    </Link>
  );
}
