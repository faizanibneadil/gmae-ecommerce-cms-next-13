import CreateImageForm from "./_components/create-image-form";
import { _getImageById } from "@/queries";

interface Props {
  params: { imageId: string };
  searchParams: { [key: string]: string };
}

const Page: React.FC<Props> = async ({ params }) => {
  const image = await _getImageById(params.imageId);
  return (
    <div className="max-w-2xl mx-auto">
      <CreateImageForm image={image} />
    </div>
  );
};

export default Page;
