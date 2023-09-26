import { prisma } from "@/config/db";
import { cache, memo, use } from "react";
import LoadSheetForm from "./_components/load-sheet-form";

const getAreas = cache(async () => {
  const areas = await prisma.areas.findMany();
  return areas;
});

const getSaleMen = cache(async () => {
  const saleMen = await prisma.user.findMany({
    where: { role: { in: ["SALES_MAN"] } },
  });
  return saleMen;
});

const Page: React.FC<{}> = memo(() => {
  const areas = use(getAreas());
  const saleMen = use(getSaleMen());
  return <LoadSheetForm areas={areas} saleMan={saleMen} />;
});

Page.displayName = "Page";
export default Page;
