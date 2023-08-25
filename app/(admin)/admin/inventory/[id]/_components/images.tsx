import { prisma } from "@/config/db";
import { cache, memo, use } from "react";
import AddImagesButton from "./add-images-button";
import { Title } from "@tremor/react";
import Thumbnails from "../images/_components/thumbnail";

interface Props {
  props: {
    productId: string;
  };
}

const getImages = cache(async (id: string) => {
  const images = await prisma.images.findMany({
    select: { id: true, src: true },
    where: { Products: { some: { id } } },
  });
  return images;
});

const Images: React.FC<{
  productId: string;
}> = ({ productId }) => {
  const images = use(getImages(productId));
  return (
    <div>
      <Title>Product Images</Title>
      <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
        {images?.map((image) => (
          <Thumbnails
            key={image.id}
            // @ts-ignore
            image={image}
            connectProductId={productId}
          />
        ))}
        <AddImagesButton />
      </div>
    </div>
  );
};

export default Images;
