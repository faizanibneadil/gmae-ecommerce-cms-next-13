import ImagesSlider from "./_components/images-slider";
import { getProductImages } from "./_queries";

interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string };
}

const Page = async ({ params }: Props) => {
  const { images } = await getProductImages(params.slug);
  return (
    <div className="flex flex-col space-y-2">
      <ImagesSlider images={images} />
    </div>
  );
};

export default Page;
