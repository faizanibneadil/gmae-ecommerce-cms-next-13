import { prisma } from "@/config/db";
import { cache, memo, use } from "react";
import EditShop from "./_components/edit-shops-button";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";

const getShops = cache(async () => {
  const shops = await prisma.shops.findMany();
  return shops;
});
const Page: React.FC<{}> = memo(() => {
  const shops = use(getShops());
  return shops?.length ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
      {shops?.map((shop) => (
        <div
          key={shop.id}
          className="flex flex-row items-center justify-between p-4 border rounded-lg"
        >
          <div className="flex flex-col space-y-1">
            <h2 className="text-base">{shop.name}</h2>
            <div className="flex flex-row space-x-2">
              <Badge>{shop.popType}</Badge>
              <Badge>{shop.payType}</Badge>
            </div>
          </div>
          <EditShop id={shop.id} />
        </div>
      ))}
    </div>
  ) : (
    notFound()
  );
});
Page.displayName = "Page";
export default Page;
