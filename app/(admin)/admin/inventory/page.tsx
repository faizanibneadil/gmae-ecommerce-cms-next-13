import { FC, cache } from "react";
import InventoryPageHeader from "./_components/inventory-page-header";
import { prisma } from "@/config/db";
import ProductList from "./_components/products-list";

const getAllProducts = cache(async () => {
  const res = await prisma.products.findMany({
    select: {
      id: true,
      title: true,
      images: {
        select: {
          id: true,
          src: true,
        },
      },
    },
  });
  return res;
});

interface Props {
  searchParams: { [key: string]: string };
  params: { id: string };
}

const Page = async ({ params }: Props) => {
  const products = await getAllProducts();
  return (
    <div>
      <InventoryPageHeader />
      <ProductList products={products} />
    </div>
  );
};
export default Page;