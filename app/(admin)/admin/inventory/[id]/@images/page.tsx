//@ts-nocheck
import { FC } from "react";
import MultipleImagesForm from "./_components/multiple-images-form";
import ImagesFormList from "./_components/images-form-list";
import { Callout, Title } from "@tremor/react";
import { getProductImagesById } from "./_queries";

interface Props {
  params: { id: string };
  searchParams: { [key: string]: string };
}

const Page: FC<Props> = async ({ params, searchParams }) => {
  const { images } = await getProductImagesById(params.id);
  return (
    <div className="mb-4">
      <Title>Product Images.</Title>

      {images.length ? (
        <ImagesFormList productId={params.id} images={images} />
      ) : (
        <Callout
          className="w-full mt-4"
          title="Product Image maximum limit is 5"
          color="green"
        >
          Maximum 5 images you can add on each product. but you can edit or
          update each image by click on any image and you can organize by order.
          <Callout
            className="w-full mt-4"
            title="How to add images in product ?"
            color="yellow"
          >
            Click the image is display in related images section.
          </Callout>
        </Callout>
      )}
    </div>
  );
};

export default Page;
