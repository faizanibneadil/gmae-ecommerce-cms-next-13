import Link from "next/link";
import { Suspense, cache, memo, use } from "react";
import { prisma } from "@/config/db";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { priceFormatter } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const getCategory = cache(async (slug: string) => {
  const category = await prisma.categories.findUnique({
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
      subCategories: {
        select: {
          id: true,
          name: true,
          slug: true,
          images: { select: { src: true } },
        },
      },
      Products: {
        select: {
          id: true,
          title: true,
          slug: true,
          salePrice: true,
          regularPrice: true,
          discountInPercentage: true,
          images: {
            select: {
              src: true,
            },
            take: 1,
          },
        },
        where: { isPublished: true },
      },
    },
    where: {
      slug: slug,
    },
  });
  return category;
});

const Page: React.FC<{ params: { slug: string } }> = memo(({ params }) => {
  const category = use(getCategory(params.slug));
  return (
    <div className="max-w-3xl mx-auto">
      {/* subCategories bar  */}
      <Suspense fallback={<div>Loading ...</div>}>
        <ScrollArea className="w-full h-auto border-b">
          <ScrollBar orientation="horizontal" className="hidden" />
          <div className="flex flex-row items-center justify-center space-x-1">
            {category?.subCategories?.map((sub) => (
              <Link key={sub.id} href={`/categories/${sub.slug}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-none rounded-none min-w-max"
                >
                  {sub.name}
                </Button>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </Suspense>
      <Suspense fallback={<div>Loading ...</div>}>
        <div>
          <div className="grid grid-cols-2 gap-2 p-1 mt-4 md:grid-cols-4">
            {category?.Products.map((item) => (
              <Link
                key={item.id}
                href={`/view/${item.slug}`}
                className="flex flex-col w-full space-y-1"
              >
                <Card className="relative w-full h-32">
                  <Image
                    fill
                    sizes="100vw"
                    src={`https://lh3.googleusercontent.com/d/${item?.images[0]?.src}=s220`}
                    alt=""
                    className="object-cover w-full h-20 mb-2 rounded-md"
                  />
                  {item.discountInPercentage > 0 && (
                    <Badge
                      className="absolute bottom-1 left-1"
                      variant="destructive"
                    >
                      {`${item.discountInPercentage.toFixed()}% OFF`}
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
        </div>
      </Suspense>
    </div>
  );
});
Page.displayName = "Page";
export default Page;
