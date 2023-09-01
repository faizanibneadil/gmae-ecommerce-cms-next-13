import { prisma } from "@/config/db";
import CreateImageForm from "./_components/create-image-form";
import { use } from "react";

export const dynamic = "force-dynamic";

const getImage = async (id: string) => {
  const image = await prisma.images.findUnique({ where: { id } });
  return image;
};

const SingleImageEditPage: React.FC<{
  params: { id: string };
  searchParams: { [key: string]: string };
}> = ({ params }) => {
  const image = use(getImage(params.id));
  return (
    <div className="max-w-2xl mx-auto">
      <CreateImageForm image={image} />
    </div>
  );
};
SingleImageEditPage.displayName = "SingleImageEditPage";
export default SingleImageEditPage;
