import React from "react";
import { getProductVariants } from "./_queries";
import ProductCard from "../../_components/productsCard";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string };
}

const Page = async ({ params }: Props) => {
  await wait(3000)
  const { productVariants } = await getProductVariants(params.slug);
  return productVariants?.length ? (
    <div className="space-y-2">
      <div className="font-semibold text-md">Also available in:</div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
        {productVariants?.map((variant) => (
          <ProductCard key={variant.id} product={variant} />
        ))}
      </div>
    </div>
  ) : (
    <p></p>
  );
};

export default Page;
