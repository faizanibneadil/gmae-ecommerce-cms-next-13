import Image from "next/image";
import Link from "next/link";
import { cache, memo, use } from "react";
import { prisma } from "@/config/db";
import { notFound } from "next/navigation";
import InfiniteScroll from "./_components/Infinite-scroll";

const getImages = cache(async () => {
  const images = await prisma.images.findMany({ take: 24 });
  return images;
});

const ImageGalleryPage: React.FC<{}> = () => {
  const images = use(getImages());
  return !!images?.length ? (
    <InfiniteScroll initialImages={images} />
  ) : (
    notFound()
  );
};

ImageGalleryPage.displayName = "ImageGalleryPage";
export default ImageGalleryPage;
