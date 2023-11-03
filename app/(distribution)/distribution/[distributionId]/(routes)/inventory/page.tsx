import { notFound } from "next/navigation";
import InfiniteScroll from "./_components/Infinite-scroll";
import { _getInventory } from "@/queries";

interface Props {
  searchParams: { [key: string]: string };
  params: { id: string; distributionId: string };
}

const Page: React.FC<Props> = async ({ params, searchParams }) => {
  const products = await _getInventory(params.distributionId);

  if (products?.length === 0) return notFound();

  if (searchParams?.query) return <div>Searching : {searchParams?.query}</div>;

  return <InfiniteScroll initial={products} />;
};

export default Page;
