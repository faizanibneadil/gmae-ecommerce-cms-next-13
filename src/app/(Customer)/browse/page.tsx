import CategoryCard from "@/app/components/categoryCart";
import { prisma } from "@/config/db";

export default async function Page() {
  const categories = await prisma.categories.findMany();
  return (
    <div className="w-full p-2 ">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
        {categories?.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
