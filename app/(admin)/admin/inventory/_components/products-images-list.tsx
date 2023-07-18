import { FC, memo } from "react";
import ProductsImagesListItem from "./products-images-list-item";

interface Props {
  images: {
    id: string;
    src: string | null;
  }[];
}

const ProductImagesList: FC<Props> = ({ images }) => {
  return (
    <div className="self-center row-span-4 md:col-span-1 md:row-span-1">
      <div className="flex flex-col items-center justify-start mr-2 -space-y-2 md:-space-y-0 md:-space-x-2 md:flex-row">
        {images?.map((image) => (
          <ProductsImagesListItem key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
};

export default memo(ProductImagesList);
