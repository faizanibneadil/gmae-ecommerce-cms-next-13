import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/config/db";
import { cache, memo, use } from "react";
import { Card } from "@/components/ui/card";

const getCategories = cache(async () => {
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
    where: {
      Products: { some: { isPublished: true } },
      isPublished: true,
    },
  });
  return categories;
});

const Page: React.FC<{}> = memo(() => {
  const categories = use(getCategories());
  return !!categories?.length ? (
    <div className="max-w-3xl p-2 mx-auto mt-4">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {categories?.map((category) => (
          <Card key={category?.id} className="relative h-48 rounded-md">
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
          </Card>
        ))}
      </div>
    </div>
  ) : (
    <p>Categories Not Found</p>
  );
});
Page.displayName = "Page";
export default Page;
