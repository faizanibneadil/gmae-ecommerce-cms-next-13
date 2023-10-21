import { memo, use } from "react";
import { _getShops } from "@/queries";
import ShopCard from "./_components/shop-card";

interface Props {
  params: { distributionId: string };
}

const Page: React.FC<Props> = memo(({ params }) => {
  const shops = use(_getShops(params.distributionId));
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
      {shops?.map((shop) => (
        <ShopCard key={shop.id} {...shop} />
      ))}
    </div>
  );
});
Page.displayName = "Page";
export default Page;
