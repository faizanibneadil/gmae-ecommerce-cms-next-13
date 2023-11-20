import InfiniteScroll from "./_components/Infinite-scroll";
import { _getInventory } from "@/queries";
import { PageProps } from "@/types";

const Page: React.FC<PageProps> = async ({ params, searchParams }) => {
  const products = await _getInventory(params.did);

  if (searchParams?.query) return <div>Searching : {searchParams?.query}</div>;

  return <InfiniteScroll initial={products} />;
};

export default Page;
