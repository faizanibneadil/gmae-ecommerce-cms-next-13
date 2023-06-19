import Categories from "./components/categories";
import CategoryPageHeader from "./components/categoryPageHeader";
import { prisma } from "@/config/db";

export default async function Page() {
  const categoriesList = await prisma.categories.findMany({
    include: {
      subCategory: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    where: {
      parentCategory: null,
    },
  });
  return (
    <div className="md:mx-52">
      <CategoryPageHeader />
      <Categories categories={categoriesList} />
    </div>
  );
}
