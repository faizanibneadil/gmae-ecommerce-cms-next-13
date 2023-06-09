"use client";

import { addToFavorite } from "@/_actions";
import { addToCart } from "@/store/cartSlice";
import { Prisma } from "@prisma/client";
import { Icon } from "@tremor/react";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export default function ProductCard({
  product,
  userId,
}: {
  product: {
    id: string;
    title: string;
    regularPrice: number;
    salePrice: number;
    images: Prisma.JsonValue;
  };
  userId?: string;
}) {
  const imageLoader = ({ src, width }: { src: string; width: number }) => {
    return `https://drive.google.com/thumbnail?id=${src}&sz=w${width}`;
  };
  const images: any = product.images;
  const dispatch = useDispatch();
  //cart
  const addItem = useCallback((value: any) => dispatch(addToCart(value)), []);
  return (
    <div className="rounded-lg shadow-md">
      <div className="relative w-full h-28">
        <Image
          loader={imageLoader}
          className="object-contain"
          fill
          alt=""
          src={images[0].src}
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
        <div className="flex justify-between mt-4 space-x-2">
          <div className="flex flex-col items-center text-left">
            <span className="text-xs font-medium line-through oldstyle-nums">
              Rs: {product.regularPrice}
            </span>
            <span className="text-sm font-medium oldstyle-nums">
              Rs: {product.salePrice}
            </span>
          </div>
          <Icon
            onClick={() => addItem(product)}
            icon={ShoppingCart}
            variant="solid"
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
