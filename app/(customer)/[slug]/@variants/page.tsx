import React from "react";
import { getProductVariants } from "./_queries";
import ProductCard from "../../_components/productsCard";

interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string };
}

const Page = async ({ params }: Props) => {
  const { variants } = await getProductVariants(params.slug);
  return (
    <div className="space-y-2">
      <div className="font-semibold text-md">Also available in:</div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
        {variants?.map((variant) => (
          <ProductCard key={variant.id} product={variant} />
        ))}
      </div>
    </div>
  );
};

export default Page;
