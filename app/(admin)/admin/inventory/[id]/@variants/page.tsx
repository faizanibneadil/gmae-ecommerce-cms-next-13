//@ts-nocheck
import { FC } from "react";
import { Callout, Title } from "@tremor/react";
import { getProductVariants } from "./_queries";
import ProductsList from "../../_components/products-list";

interface Props {
  params: { id: string };
  searchParams: { [key: string]: string };
}

const Page: FC<Props> = async ({ params, searchParams }) => {
  const { productVariants } = await getProductVariants(params.id);
  return !!productVariants?.length ? (
    <div className="space-y-2">
      <Title>Variants.</Title>

      <ProductsList
        productId={params.id}
        products={productVariants}
        showAsVariantsForInventoryForm={true}
      />
    </div>
  ) : (
    <p>Variants Not found.</p>
  );
};

export default Page;
