import { prisma } from "@/config/db";
import { cache, memo, use } from "react";
import CreateShopForm from "./_components/shop-form";

const getShop = cache(async (id: string) => {
  const shop = await prisma.shops.findUnique({ where: { id } });
  return shop;
});

const Page: React.FC<{
  params: { id: string };
}> = memo(({ params }) => {
  const shop = use(getShop(params?.id));
  return (
    <div className="max-w-3xl pb-4 mx-auto">
      <CreateShopForm shop={shop} />
    </div>
  );
});
Page.displayName = "Page";
export default Page;
