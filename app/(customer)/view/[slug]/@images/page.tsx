import { cache } from "react";
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

const Page = async ({ params }: Props) => {
  const images = await getImages(params.slug);
  return (
    <div className="flex flex-col space-y-2">
      <ImagesSlider images={images} />
    </div>
  );
};

export default Page;
