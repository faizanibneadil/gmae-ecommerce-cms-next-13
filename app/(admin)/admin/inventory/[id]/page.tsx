import { cache } from "react";
import { prisma } from "@/config/db";
import CreateInventoryForm from "./_components/create-inventory-form";

const getProductById = cache(async (id: string) => {
  const product = await prisma.products.findUniqueOrThrow({
    where: { id: id },
    include: {
      Categories: {
        select: {
          id: true,
        },
      },
    },
  });
  return product;
});

const getCategories = cache(async () => {
  const categories = await prisma.categories.findMany({
    select: { id: true, name: true },
  });
  return categories;
});

interface Props {
  params: { id: string };
  searchParams: { [key: string]: string };
}

const Page = async ({ params, searchParams }: Props) => {
  const categories = await getCategories();
  const product = await getProductById(params.id);
  return (
    <CreateInventoryForm
      id={params.id}
      categories={categories}
      product={product}
    />
  );
};

export default Page;
