import { prisma } from "@/config/db";
import { cache, memo, use } from "react";
import CreateShopForm from "./_components/shop-form";

const getShop = cache(async (id: string) => {
  const shop = await prisma.shops.findUnique({
    select: {
      id: true,
      name: true,
      owner: true,
      phone: true,
      address: true,
      popType: true,
      payType: true,
      Areas: {
        select: { id: true },
      },
    },
    where: { id },
  });
  return shop;
});

const getAreas = cache(async (distributionId: string) => {
  const areas = await prisma.areas.findMany({
    select: { id: true, name: true, shops: { select: { id: true } } },
    where: { distributors: { some: { id: distributionId } } },
  });
  return areas;
});

const Page: React.FC<{
  params: { id: string; distributionId: string };
}> = memo(({ params }) => {
  const shop = use(getShop(params?.id));
  const areas = use(getAreas(params.distributionId));
  return (
    <div className="max-w-3xl pb-4 mx-auto">
      <CreateShopForm shop={shop} areas={areas} />
    </div>
  );
});
Page.displayName = "Page";
export default Page;
