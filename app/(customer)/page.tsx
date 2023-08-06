import { prisma } from "@/config/db";
import ProductCard from "./_components/productsCard";
import Link from "next/link";
import Image from "next/image";
import Carousel from "./_components/carousel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";
import { cache, memo, use } from "react";

export const revalidate = 600;

const getCategoriesAndProducts = cache(async () => {
  const categoriesAndProducts = await prisma.categories.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      images: { select: { src: true } },
      Products: {
        select: {
          id: true,
          title: true,
          slug: true,
          images: { select: { src: true }, take: 1 },
        },
        take: 6,
      },
    },
    where: {
      Products: { some: { id: {} } },
      isPublished: true,
      displayOnLandingPage: true,
    },
    take: 8,
    orderBy: { order: "asc" },
  });
  return categoriesAndProducts;
});

interface Props {
  searchParams: { [key: string]: string };
  params: {};
}

const Page: React.FC<Props> = () => {
  const categories = use(getCategoriesAndProducts());
  const session = use(getServerSession(authOptions));
  return (
    <div>
      <Carousel />
      <div className="container mx-auto">
        {categories?.map((category) => (
          <>
            <section
              aria-labelledby={category?.name?.toString()}
              key={category.id}
              className="p-2 md:p-4"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-2 font-semibold truncate ">
                  <span className="relative w-8 h-8 rounded-full">
                    <Image
                      src={`https://drive.google.com/thumbnail?id=${category.images?.src}&sz=w64-h64`}
                      fill
                      alt=""
                      className="w-8 h-8 rounded-full"
                    />
                  </span>
                  <span className="uppercase">{category.name}</span>
                </span>
                <Link
                  href={`/categories/${category.slug}`}
                  className="font-semibold "
                >
                  See all &rarr;
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4 md:grid-cols-6">
                {category?.Products.map((p, pIdx) => (
                  <ProductCard
                    userId={session?.user.id}
                    key={pIdx}
                    product={p}
                  />
                ))}
              </div>
            </section>
            <div className="flex-grow border-t border-gray-200"></div>
          </>
        ))}
      </div>
    </div>
  );
};

const MemoizedPage = memo(Page);
export default MemoizedPage;
