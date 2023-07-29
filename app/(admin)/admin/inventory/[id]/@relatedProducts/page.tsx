import React from "react";
import { getProductVariants } from "./_queries";
import ProductsList from "../../_components/products-list";
import { Title } from "@tremor/react";

interface Props {
  params: { id: string };
  searchParams: { [key: string]: string };
}

const Page = async ({ params }: Props) => {
  const { relatedProducts } = await getProductVariants(params.id);
  return (
    <div className="mt-4 space-y-2">
      <Title>Related Products.</Title>
      <ProductsList
        productId={params.id}
        products={relatedProducts}
        showAsRelatedProductForInventoryForm={!!params.id}
      />
    </div>
  );
};

export default Page;
