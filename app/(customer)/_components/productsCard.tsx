"use client";

import { addToFavorite } from "@/_actions";
import { Badge, Icon } from "@tremor/react";
import { Heart } from "lucide-react";
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
  attributes?: {
    id: string;
    name: string | null;
    value: string | null;
  }[];
  userId?: string;
}

export default function ProductCard({ product, attributes, userId }: Props) {
  return (
    <Link href={`/view/${product.slug}`} className="rounded-lg shadow-md">
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
        {!!attributes?.length ? (
          <div className="space-x-0.5">
            {attributes?.map((attr) => (
              <Badge size="xs" key={attr.id} tooltip={attr.name?.toString()}>
                {attr.value}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
