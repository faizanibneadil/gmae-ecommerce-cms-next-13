import { cache } from "react";
import CategoryForm from "./_components/category-form";
import { prisma } from "@/config/db";
import RelateImages from "./_components/related-images";
import { Text, Title } from "@tremor/react";
import GoBack from "./_components/back-route-btn";

interface Props {
  params: { id: string };
}

const getCategories = cache(async () => {
  const categories = await prisma.categories.findMany({
    select: {
      id: true,
      name: true,
      isPublished: true,
      displayOnLandingPage: true,
      order: true,
      slug: true,
      images: { select: { id: true, src: true } },
      parentCategory: { select: { id: true, name: true } },
    },
  });
  return categories;
});

const getImages = cache(async (searchText: string | undefined | null) => {
  const images = await prisma.images.findMany({
    select: { id: true, src: true },
    where: {
      searchText: {
        hasSome: searchText?.toLowerCase()?.split(" ") ?? [""],
      },
    },
  });
  return images;
});

const Page: React.FC<Props> = async ({ params }) => {
  const categories = await getCategories();
  const searchText = categories.find((c) => c.id === params.id);
  const images = await getImages(searchText?.name);
  return (
    <>
      <div className="flex items-center justify-between p-2 border-b">
        <div className="flex justify-end space-x-2">
          <GoBack />
        </div>
        <div className="text-right">
          <Title>Update Category</Title>
          <Text>Manage categories and images.</Text>
        </div>
      </div>
      <div className="max-w-2xl mx-auto">
        <RelateImages images={images} editCategoryId={params.id} />
        <CategoryForm categories={categories} editCategoryId={params.id} />
      </div>
    </>
  );
};
export default Page;
