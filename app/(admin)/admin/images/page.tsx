import Image from "next/image";
import { Images } from "@prisma/client";
import Link from "next/link";
import { cache } from "react";
import { prisma } from "@/config/db";

const getImages = cache(async () => {
  const images = await prisma.images.findMany();
  return images;
});

const Page = async () => {
  const images = await getImages();
  return (
    <div className="gap-x-2 gap-y-2 columns-3 md:columns-8">
      {images.map((image: Images) => (
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

export default Page;
