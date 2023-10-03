import { cache, memo, use } from "react";
import { prisma } from "@/config/db";
import InfiniteScroll from "./_components/Infinite-scroll";

const getImages = cache(async () => {
  const images = await prisma.images.findMany({ take: 24 });
  return images;
});

const ImageGalleryPage: React.FC<{}> = memo(() => {
  const images = use(getImages());
  return <InfiniteScroll initialImages={images} />;
});

ImageGalleryPage.displayName = "ImageGalleryPage";
export default ImageGalleryPage;
