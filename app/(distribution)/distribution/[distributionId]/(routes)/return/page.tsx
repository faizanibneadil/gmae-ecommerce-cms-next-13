import { prisma } from "@/config/db";
import { cache, memo, use } from "react";
import SearchBills from "./_components/search-bills";

const getSaleMen = cache(async (distributionId: string) => {
  const saleMan = await prisma.user.findMany({
    select: { id: true, role: true, name: true },
    where: {
      role: { in: ["SALES_MAN"] },
      distributors: { some: { id: distributionId } },
    },
  });
  return saleMan;
});

const getAreas = cache(async (distributionId: string) => {
  const areas = await prisma.areas.findMany({
    where: { distributors: { some: { id: distributionId } } },
  });
  return areas;
});

const Page: React.FC<{
  params: { distributionId: string };
}> = memo(({ params }) => {
  const saleMan = use(getSaleMen(params.distributionId));
  const areas = use(getAreas(params.distributionId));
  return <SearchBills saleMan={saleMan} areas={areas} />;
});

Page.displayName = "Page";
export default Page;
