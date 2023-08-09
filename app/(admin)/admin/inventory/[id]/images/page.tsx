import { prisma } from "@/config/db";
import { notFound } from "next/navigation";
import { cache, memo, use } from "react";
import Thumbnails from "./_components/thumbnail";
import Link from "next/link";
import { Button } from "@tremor/react";

interface Props {
  params: { id: string };
}

const getImages = cache(async (id: string) => {
  const images = await prisma.images.findMany({
    select: { id: true, src: true },
  });
  return images;
});

const Page: React.FC<Props> = ({ params }) => {
  const images = use(getImages(params.id));
  return !!images?.length ? (
    <div>
      <Link href={`/admin/inventory/${params.id}`} prefetch={false}>
        <Button>Back to product</Button>
      </Link>
      <div className="mt-4 gap-x-2 gap-y-2 columns-3 md:columns-8">
        {images?.map((image) => (
          <Thumbnails
            key={image.id}
            props={{ image, productId: params?.id, isGallery: true }}
          />
        ))}
      </div>
    </div>
  ) : (
    notFound()
  );
};

export default Page;
