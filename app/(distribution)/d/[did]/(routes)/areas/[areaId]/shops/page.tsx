import { prisma } from "@/config/db";
import { cache, memo, use } from "react";
import ShopsForm from "./_components/shops-form";

const getShops = cache(async (id: string) => {
  const shops = await prisma.shops.findMany({
    select: {
      id: true,
      name: true,
      Areas: {
        select: {
          id: true,
        },
      },
    },
  });
  return shops;
});

const Page: React.FC<{
  params: { id: string };
}> = memo(({ params }) => {
  const shops = use(getShops(params.id));
  return (
    <div className="mt-4">
      <ShopsForm shops={shops} />
    </div>
  );
});
Page.displayName = "Page";
export default Page;
