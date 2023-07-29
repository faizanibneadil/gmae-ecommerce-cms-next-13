import { List, ListItem, Title } from "@tremor/react";
import { notFound } from "next/navigation";
import { getCategories } from "./_queries";
import CategoryList from "./_components/category-list";
import { Categories } from "@prisma/client";

interface Props {
  searchParams: { [key: string]: string | undefined };
}

const Page = async ({ searchParams }: Props) => {
  const { categories } = await getCategories();
  return !!categories?.length ? (
    <div>
      <Title>Listing - Categories.</Title>
      {categories.map((category) => (
        <CategoryList
          key={category.id}
          categories={category}
          categoryId={category.id}
        />
      ))}
    </div>
  ) : (
    notFound()
  );
};

export default Page;
