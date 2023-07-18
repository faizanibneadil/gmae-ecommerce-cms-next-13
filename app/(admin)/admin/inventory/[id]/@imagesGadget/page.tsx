import { Images } from "@prisma/client";
import { getWidgetImages } from "./_queries";
import Image from "next/image";
import { Callout, Title } from "@tremor/react";
import ImagesFormList from "./_components/images-form-list";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
  searchParams: { [key: string]: string };
}

const Page = async ({ params }: Props) => {
  const { gadgetImages, productNotFound, limitReached } = await getWidgetImages(
    params.id
  );
  return productNotFound ? (
    notFound()
  ) : (
    <div className="mb-4">
      <Title>Related images of this product.</Title>

      {limitReached ? (
        <Callout
          className="w-full mt-2"
          title="Limit Reached"
          color="rose"
        >
          REMEMBER: You can add only 5 images in each product. Remove some
          images from your product images collection then we will display you
          more related images
        </Callout>
      ) : gadgetImages.length ? (
        <ImagesFormList productId={params.id} images={gadgetImages} />
      ) : (
        <Callout
          className="w-full mt-2"
          title="Related Images not found."
          // icon={CheckCircleIcon}
          color="rose"
        >
          First type product title then save, image gadget display all related
          images of this product.
        </Callout>
      )}
    </div>
  );
};

export default Page;
