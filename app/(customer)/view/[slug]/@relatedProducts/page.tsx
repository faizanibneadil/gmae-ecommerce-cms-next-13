import { cache, memo, use } from "react";
import ProductCard from "../../../_components/productsCard";
import { prisma } from "@/config/db";

interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string };
}

const getProducts = cache(async (slug: string) => {
  const products = await prisma.products.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      images: {
        select: {
          src: true,
        },
        take: 1,
      },
    },
    where: {
      slug: {
        search: slug.split("-").join(" | "),
      },
    },
  });
  return !!products.length ? products : [];
});

const Page: React.FC<Props> = ({ params }) => {
  const products = use(getProducts(params.slug));
  return !!products?.length ? (
    <div className="space-y-2">
      <div className="font-semibold text-md">Related Products:</div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  ) : null;
};

const MemoizedPage = memo(Page);
export default MemoizedPage;
