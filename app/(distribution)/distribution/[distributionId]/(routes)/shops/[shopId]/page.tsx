import CreateShopForm from "./_components/shop-form";
import { _getAreas, _getShopById } from "@/queries";

interface Props {
  params: { shopId: string; distributionId: string };
}

const Page: React.FC<Props> = async ({ params }) => {
  const shop = await _getShopById(params?.shopId);
  const areas = await _getAreas(params.distributionId);
  return (
    <div className="max-w-3xl pb-4 mx-auto">
      <CreateShopForm shop={shop} areas={areas} />
    </div>
  );
};

export default Page;
