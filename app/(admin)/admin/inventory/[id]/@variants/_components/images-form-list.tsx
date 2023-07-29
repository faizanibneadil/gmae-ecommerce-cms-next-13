import ImagesFormListItem from "./images-form-list-item";
import { FC, memo } from "react";

interface Props {
  images: {
    id: string;
    src: string;
    order: number;
  }[];
  productId: string;
}

const ImagesFormList: FC<Props> = ({ images, productId }) => {
  return (
    <div className="flex items-center mr-2 -space-x-2">
      {images.map((image, index) => (
        <ImagesFormListItem
          productId={productId}
          imageId={image.id}
          key={image.id}
          image={image}
          index={index}
        />
      ))}
    </div>
  );
};

export default memo(ImagesFormList);
