import { _getImages } from "@/queries";
import ImageCard from "./_components/image-card";

interface Props {
  params: { inventoryId: string };
}

const Page: React.FC<Props> = async ({ params }) => {
  const images = await _getImages();
  return (
    <div className="grid grid-cols-2 gap-1 md:grid-cols-5">
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
};
export default Page;
