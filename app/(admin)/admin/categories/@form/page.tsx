import { Title } from "@tremor/react";
import InitializeNewCategory from "../_components/initialize-new-category";
import CategoryForm from "./_components/category-form";
import { getCategories, getWidgetImagesAndCategoryById } from "../_queries";

interface Props {
  searchParams: { [key: string]: string | undefined };
}

const Page = async ({ searchParams }: Props) => {
  const { category } = await getWidgetImagesAndCategoryById(searchParams?.id);
  const { categories } = await getCategories();
  return searchParams?.id ? (
    <div className="space-y-2">
      <Title>Create New Category.</Title>
      <CategoryForm
        categories={categories}
        category={category}
        categoryId={searchParams?.id}
        key={searchParams?.id}
      />
    </div>
  ) : (
    <InitializeNewCategory />
  );
};

export default Page;
