import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { priceFormatter } from "@/lib/utils";
import { ArrowRightIcon } from "../_components/icons";
import { _getCategoriesProducts } from "@/queries";
import dynamic from "next/dynamic";
import { PageProps } from "@/types";

const Carousel = dynamic(() => import("./_components/carousel"), {
  ssr: false,
});

const Page: React.FC<PageProps> = async () => {
  const categories = await _getCategoriesProducts();
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
                      {item?.discountInPercentage > 0 && (
                        <Badge
                          className="absolute bottom-1 left-1"
                          variant="destructive"
                        >
                          {`${item?.discountInPercentage?.toFixed()}% OFF`}
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
    </div>
  );
};
export default Page;
