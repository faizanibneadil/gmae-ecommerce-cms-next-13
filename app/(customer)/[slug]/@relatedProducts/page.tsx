import React from "react";
import { getProductVariants } from "./_queries";
import ProductCard from "../../_components/productsCard";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string };
}

const Page = async ({ params }: Props) => {
  await wait(9000)
  const { relatedProducts } = await getProductVariants(params.slug);
  return relatedProducts?.length ? (
    <div className="space-y-2">
      <div className="font-semibold text-md">More Products.</div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
        {relatedProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  ) : (
    <p></p>
  );
};

export default Page;
