import { memo, use } from "react";
import InfiniteScroll from "./_components/Infinite-scroll";
import { _getImages } from "@/queries";

const Page: React.FC<{}> = memo(() => {
  const images = use(_getImages());
  return <InfiniteScroll initialImages={images} />;
});

Page.displayName = "Page";
export default Page;
