import { prisma } from "@/config/db";
import CreateImageForm from "./_components/create-image-form";
import { use } from "react";
import { Text, Title } from "@tremor/react";
import GoBack from "./_components/back-route-btn";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
  searchParams: { [key: string]: string };
}

const getImage = async (id: string) => {
  const image = await prisma.images.findUnique({ where: { id } });
  return image;
};

const Page: React.FC<Props> = ({ params }) => {
  const image = use(getImage(params.id));
  return (
    <>
      <div className="flex items-center justify-between p-2 border-b">
        <div className="flex justify-end space-x-2">
          <GoBack />
        </div>
        <div className="text-right">
          <Title>Update Image</Title>
          <Text>Manage your store images.</Text>
        </div>
      </div>
      <div className="max-w-xl mx-auto">
        <CreateImageForm id={params?.id} image={image} />
      </div>
    </>
  );
};

export default Page;
