import { memo, use } from "react";
import CreateAreaForm from "./_components/create-area-form";
import { _getAreaById } from "@/queries";

interface Props {
  params: { areaId: string };
}

const Page: React.FC<Props> = memo(({ params }) => {
  const area = use(_getAreaById(params?.areaId));
  return (
    <div className="max-w-4xl mx-auto">
      <CreateAreaForm areas={area} />
    </div>
  );
});

Page.displayName = "Page";
export default Page;
