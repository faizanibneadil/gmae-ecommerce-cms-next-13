import { cache, memo, use } from "react";
import { prisma } from "@/config/db";
import AreasForm from "./_components/areas-form";

const getAreas = cache(async (shopId: string) => {
  const areas = await prisma.areas.findMany({
    select: {
      _count: {
        select: {
          shops: true,
        },
      },
      id: true,
      name: true,
      shops: {
        select: {
          id: true,
        },
        where: {
          id: shopId,
        },
      },
    },
  });
  return areas;
});

const Page: React.FC<{
  params: { id: string };
}> = memo(({ params }) => {
  const areas = use(getAreas(params.id));
  return <AreasForm areas={areas} />;
});

Page.displayName = "Page";
export default Page;
