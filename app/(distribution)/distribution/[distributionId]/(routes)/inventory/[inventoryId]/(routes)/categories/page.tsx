import { memo, use } from "react";
import CategoriesForm from "./_components/categories-form";
import { _getCategoriesOfProduct } from "@/queries";

interface Props {
  params: { inventoryId: string };
}

const Page: React.FC<Props> = async ({ params }) => {
  const categories = await _getCategoriesOfProduct({
    productId: params.inventoryId,
  });
  return (
    <div className="mt-4">
      <CategoriesForm categories={categories} />
    </div>
  );
};
export default Page;
