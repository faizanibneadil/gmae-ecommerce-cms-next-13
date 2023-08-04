import ImagesSlider from "./_components/images-slider";
import { getProductImages } from "./_queries";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string };
}

const Page = async ({ params }: Props) => {
  await wait(4000);
  const { images } = await getProductImages(params.slug);
  return (
    <div className="flex flex-col space-y-2">
      <ImagesSlider images={images} />
    </div>
  );
};

export default Page;
