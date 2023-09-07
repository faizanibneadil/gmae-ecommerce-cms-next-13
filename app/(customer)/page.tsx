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
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { calculatePercentage, priceFormatter } from "@/lib/utils";
import { ArrowRightIcon } from "../_components/icons";

export const revalidate = 600;

const getCategories = cache(async () => {
  const categories = await prisma.categories.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      Products: {
        select: {
          id: true,
          title: true,
          slug: true,
          regularPrice: true,
          salePrice: true,
          images: { select: { src: true }, take: 1 },
        },
      },
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
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <Card className="relative w-20 h-20">
                  <Image
                    fill
                    sizes="100vw"
                    src={`https://lh3.googleusercontent.com/d/${category?.images?.src}=s220`}
                    alt=""
                    className="object-cover w-full h-20 rounded-md"
                  />
                </Card>
              </Link>
            ))}
          </div>
          <div className="flex flex-row items-center justify-center space-x-2">
            {categories?.map((category) => (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <Card className="relative w-20 h-20">
                  <Image
                    fill
                    sizes="100vw"
                    src={`https://lh3.googleusercontent.com/d/${category?.images?.src}=s220`}
                    alt=""
                    className="object-cover w-full h-20 rounded-md"
                  />
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </ScrollArea>
      <div>
        {categories?.map((category) => (
          <div key={category.id} className="flex flex-col space-y-2">
            <div className="flex items-center justify-between p-2 font-bold uppercase">
              <div className="truncate line-clamp-1">{category.name}</div>
              <Link href={`/categories/${category.slug}`}>
                <ArrowRightIcon />
              </Link>
            </div>
            <ScrollArea className="w-full h-auto p-2 pb-4 mt-2 mb-2">
              <ScrollBar orientation="horizontal" />
              <div className="flex flex-row items-center justify-center space-x-2">
                {category.Products?.map((item) => (
                  <Link
                    key={item.id}
                    href={`/view/${item.slug}`}
                    className="flex flex-col w-40 space-y-1"
                  >
                    <Card className="relative w-40 h-32">
                      <Image
                        fill
                        sizes="100vw"
                        src={`https://lh3.googleusercontent.com/d/${item?.images[0]?.src}=s220`}
                        alt=""
                        className="object-cover w-full h-20 mb-2 rounded-md"
                      />
                      {calculatePercentage(
                        Number(item.regularPrice),
                        Number(item.salePrice)
                      ) > 0 && (
                        <Badge
                          className="absolute bottom-1 left-1"
                          variant="destructive"
                        >
                          {`${calculatePercentage(
                            Number(item.regularPrice),
                            Number(item.salePrice)
                          )}% OFF`}
                        </Badge>
                      )}
                    </Card>
                    <h2 className="text-sm line-clamp-2">{item.title}</h2>
                    <div className="flex flex-row items-center justify-between">
                      <Badge className="">
                        {priceFormatter.format(Number(item.salePrice))}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </div>
        ))}
      </div>
      {/* {!!products?.length ? (
        <InfiniteScroll initialInventory={products} />
      ) : (
        notFound()
      )} */}
    </div>
  );
});
Page.displayName = "Page";
export default Page;
