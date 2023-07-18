import { FC, memo } from "react";
import ImagesFormListItem from "./images-form-list-item";

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
          key={image.id}
          image={image}
          index={index}
          productId={productId}
          imageId={image.id}
        />
      ))}
    </div>
  );
};

export default memo(ImagesFormList);
