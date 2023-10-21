import { memo, use } from "react";
import CreateShopForm from "./_components/shop-form";
import { _getAreas, _getShopById } from "@/queries";

interface Props {
  params: { id: string; distributionId: string };
}

const Page: React.FC<Props> = memo(({ params }) => {
  const shop = use(_getShopById(params?.id));
  const areas = use(_getAreas(params.distributionId));
  return (
    <div className="max-w-3xl pb-4 mx-auto">
      <CreateShopForm shop={shop} areas={areas} />
    </div>
  );
});
Page.displayName = "Page";
export default Page;
