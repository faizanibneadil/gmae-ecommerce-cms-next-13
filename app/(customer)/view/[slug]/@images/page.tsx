import { cache, memo, use } from "react";
import ImagesSlider from "./_components/images-slider";
import { prisma } from "@/config/db";

interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string };
}

const getImages = cache(async (slug: string) => {
  const productImages = await prisma.products.findUnique({
    select: {
      images: {
        select: {
          id: true,
          src: true,
        },
      },
    },
    where: {
      slug: slug,
    },
  });
  return productImages;
});

const Page: React.FC<Props> = memo(({ params }) => {
  const images = use(getImages(params.slug));
  return (
    <div className="flex flex-col space-y-2">
      <ImagesSlider images={images} />
    </div>
  );
});

Page.displayName = "Page";
export default Page;
