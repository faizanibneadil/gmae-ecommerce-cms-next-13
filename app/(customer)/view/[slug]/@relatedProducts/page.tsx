import React, { cache } from "react";
import ProductCard from "../../../_components/productsCard";
import { prisma } from "@/config/db";

interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string };
}

const getRelatedProducts = cache(async (slug: string) => {
  const searchText = await prisma.products.findUnique({
    where: { slug: slug },
    select: { title: true },
  });
  const alsoAvailableIn = await prisma.products.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      images: {
        select: {
          id: true,
          src: true,
        },
        take: 1,
      },
    },
    where: {
      title: {
        search: searchText?.title?.split(" ").join(" | "),
      },
    },
  });
  return alsoAvailableIn;
});

const Page = async ({ params }: Props) => {
  const relatedProducts = await getRelatedProducts(params.slug);
  return relatedProducts?.length ? (
    <div className="space-y-2">
      <div className="font-semibold text-md">More Products.</div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
        {relatedProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  ) : null;
};

export default Page;
