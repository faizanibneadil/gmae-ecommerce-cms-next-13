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
    <div className="grid grid-cols-5 gap-x-4 justify-self-center">
      {images?.map((image) => (
        <ProductsImagesListItem key={image.id} image={image} />
      ))}
    </div>
  );
};

export default memo(ProductImagesList);
