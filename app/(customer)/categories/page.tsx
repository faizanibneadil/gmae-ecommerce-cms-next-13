import Image from "next/image";
import Link from "next/link";
import { getCategories } from "./_queries";
import { prisma } from "@/config/db";

const Page = async () => {
  // const { categories } = await getCategories();
  const categories = await prisma.categories.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      images: {
        select: {
          id: true,
          src: true,
        },
      },
    },
  });
  return !!categories?.length ? (
    <div className="max-w-3xl p-2 mx-auto mt-4">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {categories?.map((category) => (
          <div key={category?.id} className="relative h-48 rounded-md">
            <Link href={`/categories/${category?.slug}`}>
              <Image
                src={`https://lh3.googleusercontent.com/d/${category?.images?.src}=s220`}
                fill
                className="object-cover rounded-md"
                alt={`${category?.name}`}
              />
              <div className="absolute inset-0 flex items-center justify-center text-lg text-center text-white rounded-md bg-gray-700/40">
                {category?.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <p>Categories Not Found</p>
  );
};
export default Page;
