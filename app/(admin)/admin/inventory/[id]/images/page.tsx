import { prisma } from "@/config/db";
import { notFound } from "next/navigation";
import { cache, memo, use } from "react";
import Thumbnails from "./_components/thumbnail";
import Link from "next/link";
import { Button, Card, Text, Title } from "@tremor/react";
import GoBack from "../_components/back-route-btn";
import PageHeader from "@/app/(admin)/_components/page-header";
import Image from "next/image";

interface Props {
  params: { id: string };
}

const getImages = cache(async (id: string) => {
  const images = await prisma.images.findMany({
    select: {
      id: true,
      src: true,
      Products: {
        select: { id: true },
        where: { id },
      },
    },
  });
  return images;
});

const Page: React.FC<Props> = ({ params }) => {
  const images = use(getImages(params.id));
  return !!images?.length ? (
    <div>
      <PageHeader
        backRoute={`/admin/inventory/${params?.id}`}
        enableBackButton={true}
        pageDescription="Update Product images."
        pageHeading="Update Images"
      />
      <div className="max-w-4xl mx-auto mt-4">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-8">
          {images?.map((image) => (
            <Thumbnails key={image.id} image={image} connectProductId={params.id} />
          ))}
        </div>
      </div>
    </div>
  ) : (
    notFound()
  );
};

export default Page;
