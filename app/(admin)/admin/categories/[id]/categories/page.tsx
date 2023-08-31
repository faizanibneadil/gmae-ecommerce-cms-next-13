import { prisma } from "@/config/db";
import { cache, memo, use } from "react";
import CategoriesForm from "./_components/categories-form";

const getCategories = cache(async (id: string) => {
  const categories = await prisma.categories.findMany({
    select: {
      id: true,
      name: true,
      isPublished: true,
      displayOnLandingPage: true,
      images: { select: { src: true } },
      subCategories: {
        select: {
          id: true,
        },
        where: {
          categoriesBy: {
            some: {
              id,
            },
          },
        },
      },
    },
  });
  return categories;
});

const Page: React.FC<{
  params: { id: string };
}> = memo(({ params }) => {
  const categories = use(getCategories(params.id));
  console.log(categories);
  return (
    <div className="mt-4">
      <CategoriesForm categories={categories} />
    </div>
  );
});
Page.displayName = "Page";
export default Page;
