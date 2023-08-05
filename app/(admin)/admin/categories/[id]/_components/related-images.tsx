import Image from "next/image";
import ConnectImage from "./connect-image";
import { use } from "react";
type Image = {
  id: string;
  src: string | null;
};

interface Props {
  images: Image[];
  editCategoryId: string;
}
const RelateImages: React.FC<Props> = ({ images, editCategoryId }) => {
  return (
    <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
      {images?.map((img) => (
        <ConnectImage key={img.id} categoryId={editCategoryId} imageId={img.id}>
          <Image
            alt=""
            fill
            sizes="100vw"
            src={`https://drive.google.com/thumbnail?id=${img?.src}&sz=w280`}
            className="object-cover rounded-md shadow-lg ring-2 ring-white"
          />
        </ConnectImage>
      ))}
    </div>
  );
};
export default RelateImages;
