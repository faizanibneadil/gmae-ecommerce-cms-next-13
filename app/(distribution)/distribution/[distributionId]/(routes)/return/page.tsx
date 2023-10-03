import { prisma } from "@/config/db";
import { cache, memo, use } from "react";
import BillReturnForm from "./_components/bill-return-form";

const getSaleMen = cache(async () => {
  const saleMan = await prisma.user.findMany({
    select: { id: true, role: true, name: true },
    where: { role: { in: ["SALES_MAN"] } },
  });
  return saleMan;
});

const getAreas = cache(async () => {
  const areas = await prisma.areas.findMany();
  return areas;
});

const Page: React.FC<{}> = memo(() => {
  const saleMan = use(getSaleMen());
  const areas = use(getAreas());
  return <BillReturnForm saleMan={saleMan} areas={areas} />;
});

Page.displayName = "Page";
export default Page;
