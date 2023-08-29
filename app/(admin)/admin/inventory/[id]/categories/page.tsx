import { Switch } from "@/components/ui/switch";
import { prisma } from "@/config/db";
import { cache, memo, use } from "react";
import CategoriesForm from "./_components/categories-form";

const getCategories = cache(async (id: string) => {
  const categories = await prisma.categories.findMany({
    select: {
      id: true,
      name: true,
      parentCategory: {
        select: {
          name: true,
        },
      },
      Products: { select: { id: true }, where: { id } },
    },
  });
  return categories;
});

const Page: React.FC<{
  params: { id: string };
}> = memo(({ params }) => {
  const categories = use(getCategories(params.id));
  return (
    <div className="">
      <CategoriesForm categories={categories} />
    </div>
  );
});
Page.displayName = "Page";
export default Page;
