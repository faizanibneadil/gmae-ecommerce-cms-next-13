import { prisma } from "@/config/db";
import { cache, memo, use } from "react";
import BillingForm from "./_components/billing-form";

const getUsers = cache(async () => {
  const users = await prisma.user.findMany({
    select: { id: true, role: true, name: true },
    where: { role: { in: ["BOOKER", "SALES_MAN"] } },
  });
  return users;
});

const getCompanies = cache(async () => {
  const companies = await prisma.companies.findMany();
  return companies;
});

const getAreas = cache(async () => {
  const areas = await prisma.areas.findMany();
  return areas;
});

const Page: React.FC<{}> = memo(() => {
  const users = use(getUsers());
  const companies = use(getCompanies());
  const areas = use(getAreas());
  return (
    <div>
      <BillingForm users={users} companies={companies} areas={areas} />
    </div>
  );
});

Page.displayName = "Page";
export default Page;
