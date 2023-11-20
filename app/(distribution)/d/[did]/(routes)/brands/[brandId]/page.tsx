import { memo, use } from "react";
import { _getAreaById } from "@/queries";
import CreateBrandForm from "./_components/create-brand-form";

interface Props {
  params: { brandId: string };
}

const Page: React.FC<Props> = memo(({ params }) => {
  const brand = use(_getAreaById(params?.brandId));
  return (
    <div className="max-w-4xl mx-auto">
      <CreateBrandForm brand={brand} />
    </div>
  );
});

Page.displayName = "Page";
export default Page;
