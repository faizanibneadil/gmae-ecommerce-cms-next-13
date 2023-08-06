import Image from "next/image";
import Link from "next/link";
import { cache, memo, use } from "react";
import { prisma } from "@/config/db";

const getImages = cache(async () => {
  const images = await prisma.images.findMany();
  return images;
});

const Page = () => {
  const images = use(getImages());
  return (
    <div className="gap-x-2 gap-y-2 columns-3 md:columns-8">
      {images.map((image) => (
        <Link key={image.id} href={`/admin/images?id=${image.id}`} replace>
          <Image
            key={image.id}
            alt={image?.altText as string}
            width={200}
            height={200}
            src={`https://lh3.googleusercontent.com/d/${image.src}=s220`}
            className="w-full mb-2 rounded-md"
          />
        </Link>
      ))}
    </div>
  );
};

const MemoizedPage = memo(Page);
export default MemoizedPage;
