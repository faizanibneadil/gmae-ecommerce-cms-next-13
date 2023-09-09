import { cache, memo, use } from "react";
// import ProductCard from "../../../_components/productsCard";
import { prisma } from "@/config/db";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string };
}

const getVariants = cache(async (slug: string) => {
  const [variants] = await prisma.products.findMany({
    select: {
      variants: {
        select: {
          id: true,
          title: true,
          slug: true,
          images: {
            select: {
              id: true,
              src: true,
            },
          },
          Attributes: {
            select: { id: true, name: true, value: true },
          },
        },
        where: {
          slug: {
            not: slug,
          },
        },
      },
    },
    where: {
      slug: slug,
    },
  });
  return !!variants?.variants.length ? variants.variants : [];
});

const Page: React.FC<Props> = memo(({ params }) => {
  const variants = use(getVariants(params.slug));
  return !!variants?.length ? (
    <>
      <h2 className="mt-2 font-semibold text-md">Variants</h2>

      <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
        {variants?.map((v) => (
          <Card key={v.id} className="relative w-full h-20">
            <Image
              fill
              sizes="100vw"
              src={`https://lh3.googleusercontent.com/d/${v.images[0]?.src?.toString()}=s820`}
              alt=""
              className="object-contain w-full h-20 rounded-md"
            />
          </Card>
        ))}
      </div>
    </>
  ) : null;
});
Page.displayName = "Page";
export default Page;
