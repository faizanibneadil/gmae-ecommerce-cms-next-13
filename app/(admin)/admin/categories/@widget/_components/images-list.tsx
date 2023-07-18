import { FC, memo, useMemo } from "react";
import ImagesListItem from "./images-list-item";

interface Props {
  images: {
    id: string;
    src: string;
  }[];
  categoryId: string;
}

const ImagesList: FC<Props> = ({ images, categoryId }) => {
  const memoizedImages = useMemo(() => images, [categoryId]);
  return (
    <div className="gap-x-2 gap-y-2 columns-3 md:columns-8">
      {memoizedImages.map((image, index) => (
        <ImagesListItem
          key={image.id}
          image={image}
          index={index}
          categoryId={categoryId}
          imageId={image.id}
        />
      ))}
    </div>
  );
};

export default memo(ImagesList);
