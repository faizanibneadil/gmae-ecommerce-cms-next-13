import { prisma } from "@/config/db";
import Image from "next/image";
import Carousel from "./_components/carousel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";
import { cache, memo, use } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import InfiniteScroll from "./_components/Infinite-scroll";
import { notFound } from "next/navigation";

export const revalidate = 600;

const getCategories = cache(async () => {
  const categories = await prisma.categories.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      images: { select: { src: true } },
    },
    where: {
      Products: { some: { isFeatured: true, isPublished: true } },
      isPublished: true,
      displayOnLandingPage: true,
    },
    take: 8,
    orderBy: { order: "asc" },
  });
  return categories;
});

const getInitialProducts = cache(async () => {
  const res = await prisma.products.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      isPublished: true,
      isFeatured: true,
      stock: true,
      salePrice: true,
      regularPrice: true,
      images: {
        select: {
          id: true,
          src: true,
        },
      },
    },
    take: 24,
  });
  return res;
});

interface Props {
  searchParams: { [key: string]: string };
  params: {};
}

const Page: React.FC<Props> = memo(() => {
  const categories = use(getCategories());
  const session = use(getServerSession(authOptions));
  const products = use(getInitialProducts());
  return (
    <div>
      <Carousel />
      <ScrollArea className="w-full h-auto p-2 pb-4 mt-2 mb-2">
        <ScrollBar orientation="horizontal" />
        <div className="flex flex-col space-y-2">
          <div className="flex flex-row items-center justify-center space-x-2">
            {categories?.map((category) => (
              <Card key={category.id} className="relative w-20 h-20">
                <Image
                  fill
                  sizes="100vw"
                  src={`https://lh3.googleusercontent.com/d/${category?.images?.src}=s220`}
                  alt=""
                  className="object-cover w-full h-20 rounded-md"
                />
              </Card>
            ))}
          </div>
          <div className="flex flex-row items-center justify-center space-x-2">
            {categories?.map((category) => (
              <Card key={category.id} className="relative w-20 h-20">
                <Image
                  fill
                  sizes="100vw"
                  src={`https://lh3.googleusercontent.com/d/${category?.images?.src}=s220`}
                  alt=""
                  className="object-cover w-full h-20 rounded-md"
                />
              </Card>
            ))}
          </div>
        </div>
      </ScrollArea>
      <div className="max-w-6xl p-2 mx-auto">
        {!!products?.length ? (
          <InfiniteScroll initialInventory={products} />
        ) : (
          notFound()
        )}
      </div>
    </div>
  );
});
Page.displayName = "Page";
export default Page;
