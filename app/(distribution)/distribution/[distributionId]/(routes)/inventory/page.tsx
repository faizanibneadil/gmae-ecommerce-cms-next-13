import { memo, use } from "react";
import { notFound } from "next/navigation";
import InfiniteScroll from "./_components/Infinite-scroll";
import { _getInventory } from "@/queries";

interface Props {
  searchParams: { [key: string]: string };
  params: { id: string; distributionId: string };
}

const Page: React.FC<Props> = memo(({ params, searchParams }) => {
  const products = use(_getInventory(params.distributionId));
  return !!products?.length ? (
    <InfiniteScroll initial={products} />
  ) : (
    notFound()
  );
});
Page.displayName = "Page";
export default Page;
