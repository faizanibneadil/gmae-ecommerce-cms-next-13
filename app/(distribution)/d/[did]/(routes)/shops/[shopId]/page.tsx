import CreateShopForm from "./_components/shop-form";
import { _getAreas, _getShopById } from "@/queries";

interface Props {
  params: { shopId: string; did: string };
}

const Page: React.FC<Props> = async ({ params }) => {
  const [shop, areas] = await Promise.all([
    _getShopById(params?.shopId),
    _getAreas(params.did),
  ]);
  return (
    <div className="max-w-3xl pb-4 mx-auto">
      <CreateShopForm shop={shop} areas={areas} />
    </div>
  );
};

export default Page;
