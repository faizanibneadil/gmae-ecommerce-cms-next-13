import { cache, memo, use } from "react";
import { prisma } from "@/config/db";
import { notFound } from "next/navigation";
import InfiniteScroll from "./_components/Infinite-scroll";

const getAllProducts = cache(async () => {
  const res = await prisma.products.findMany({
    select: {
      id: true,
      title: true,
      isPublished: true,
      isFeatured: true,
      stock: true,
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

const Page: React.FC<{
  searchParams: { [key: string]: string };
  params: { id: string; distributionId: string };
}> = memo(({ params, searchParams }) => {
  const products = use(getAllProducts());
  return !!products?.length ? (
    <InfiniteScroll
      initialInventory={products}
      distributionId={params.distributionId}
    />
  ) : (
    notFound()
  );
});
Page.displayName = "Page";
export default Page;
