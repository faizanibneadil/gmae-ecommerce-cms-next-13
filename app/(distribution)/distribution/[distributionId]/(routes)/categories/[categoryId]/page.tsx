import CategoryForm from "./_components/category-form";
import { prisma } from "@/config/db";

interface Props {
  params: { categoryId: string };
}

const getCategories = async (id: string) => {
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
};

const Page: React.FC<Props> = async ({ params }) => {
  const categories = await getCategories(params?.categoryId);
  return (
    <div className="max-w-2xl mx-auto">
      <CategoryForm categories={categories} />
    </div>
  );
};

export default Page;
