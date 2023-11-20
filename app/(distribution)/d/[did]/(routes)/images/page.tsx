import { memo, use } from "react";
import InfiniteScroll from "./_components/Infinite-scroll";
import { _getImages } from "@/queries";
import { PageProps } from "@/types";

const Page: React.FC<PageProps> = memo(() => {
  const images = use(_getImages());
  return <InfiniteScroll initialImages={images} />;
});

Page.displayName = "Page";
export default Page;
