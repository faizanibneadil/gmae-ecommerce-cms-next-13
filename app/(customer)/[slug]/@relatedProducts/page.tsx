import React from "react";
import { getProductVariants } from "./_queries";
import ProductCard from "../../_components/productsCard";

interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string };
}

const Page = async ({ params }: Props) => {
  const { relatedProducts } = await getProductVariants(params.slug);
  return (
    <div className="space-y-2">
      <div className="font-semibold text-md">Related Products.</div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
        {relatedProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Page;
