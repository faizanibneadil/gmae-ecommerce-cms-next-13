import React, { cache } from "react";
import ProductCard from "../../../_components/productsCard";
import { prisma } from "@/config/db";

interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string };
}

const getVariants = cache(async (slug: string) => {
  const [variants] = await prisma.products.findMany({
    select: {
      variants: {
        select: {
          id: true,
          title: true,
          slug: true,
          images: {
            select: {
              id: true,
              src: true,
            },
          },
        },
      },
    },
    where: {
      slug: slug,
    },
  });
  return !!variants?.variants.length ? variants.variants : [];
});

const Page = async ({ params }: Props) => {
  const variants = await getVariants(params.slug);
  return !!variants?.length ? (
    <div className="space-y-2">
      <div className="font-semibold text-md">Also available in:</div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
        {variants?.map((variant) => (
          <ProductCard key={variant.id} product={variant} />
        ))}
      </div>
    </div>
  ) : null;
};

export default Page;
