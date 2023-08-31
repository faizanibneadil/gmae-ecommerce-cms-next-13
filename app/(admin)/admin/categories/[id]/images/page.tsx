import { Card } from "@/components/ui/card";
import { prisma } from "@/config/db";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache, memo, use } from "react";
import ImageLinkUnlink from "./_components/image-link-unlink-button";

const getImages = cache(async (id: string) => {
  const images = await prisma.images.findMany({
    select: {
      id: true,
      src: true,
      Categories: {
        select: { id: true },
        where: { id },
      },
    },
  });
  return images;
});

const Page: React.FC<{
  params: { id: string };
}> = ({ params }) => {
  const images = use(getImages(params.id));
  return !!images?.length ? (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-8">
      {images?.map((image) => (
        <div key={image.id} className="flex flex-col space-y-1">
          <Card className="relative w-full h-32">
            <Image
              fill
              sizes="100vh"
              src={`https://lh3.googleusercontent.com/d/${image.src}=s220`}
              alt=""
              className="object-contain w-full h-20 mb-2 rounded-md"
            />
          </Card>
          <ImageLinkUnlink
            unLinkId={image?.Categories[0]?.id}
            imageId={image.id}
          />
        </div>
      ))}
    </div>
  ) : (
    notFound()
  );
};
Page.displayName = "Page";
export default Page;
