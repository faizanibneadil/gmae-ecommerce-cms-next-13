import CreateImageForm from "./_components/create-image-form";
import { use } from "react";
import { _getImageById } from "@/queries";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
  searchParams: { [key: string]: string };
}

const Page: React.FC<Props> = ({ params }) => {
  const image = use(_getImageById(params.id));
  return (
    <div className="max-w-2xl mx-auto">
      <CreateImageForm image={image} />
    </div>
  );
};
Page.displayName = "Page";
export default Page;
