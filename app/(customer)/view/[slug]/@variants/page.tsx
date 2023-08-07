import { cache, memo, use } from "react";
import ProductCard from "../../../_components/productsCard";
import { prisma } from "@/config/db";

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

const Page: React.FC<Props> = ({ params }) => {
  const variants = use(getVariants(params.slug));
  return !!variants?.length ? (
    <div className="space-y-2">
      <div className="font-semibold text-md">Also available in:</div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
        {variants?.map((variant) => (
          <ProductCard
            key={variant.id}
            product={variant}
            attributes={variant.Attributes}
          />
        ))}
      </div>
    </div>
  ) : null;
};

const MemoizedPage = memo(Page);
export default MemoizedPage;
