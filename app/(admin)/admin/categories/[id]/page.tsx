import { cache, memo, use } from "react";
import CategoryForm from "./_components/category-form";
import { prisma } from "@/config/db";

const getCategories = cache(async (id: string) => {
  const categories = await prisma.categories.findUnique({
    select: {
      id: true,
      name: true,
      isPublished: true,
      displayOnLandingPage: true,
      order: true,
      slug: true,
    },
    where: {
      id,
    },
  });
  return categories;
});

const Page: React.FC<{
  params: { id: string };
}> = memo(({ params }) => {
  const categories = use(getCategories(params?.id));
  return (
    <div className="max-w-2xl mx-auto">
      <CategoryForm categories={categories} />
    </div>
  );
});
Page.displayName = "Page";
export default Page;
