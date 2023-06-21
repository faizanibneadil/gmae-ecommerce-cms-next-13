"use client";

import { Prisma, Products } from "@prisma/client";
import { Button, Card, Icon } from "@tremor/react";
import { Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({
  product,
}: {
  product: {
    id: string;
    title: string;
    regularPrice: number;
    salePrice: number;
    images: Prisma.JsonValue;
  };
}) {
  const imageLoader = ({ src }: { src: string }) => {
    return `https://drive.google.com/uc?export=view&id=${src}`;
  };
  const images: any = product.images;
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
          icon={Heart}
          variant="solid"
          tooltip="Add to favorite"
          color="rose"
          size="xs"
          className="absolute cursor-pointer top-2 right-2"
        />
      </div>
      <div className="p-2 mt-2">
        <h2 className="line-clamp-2">{product.title}</h2>
        <div className="flex justify-between mt-4 space-x-2">
          <div className="flex flex-col items-center text-left">
            <span className="text-xs font-medium line-through">
              Rs: {product.regularPrice}
            </span>
            <span className="text-sm font-medium">Rs: {product.salePrice}</span>
          </div>
          <Icon
            icon={ShoppingBag}
            variant="solid"
            tooltip="Add to cart"
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
