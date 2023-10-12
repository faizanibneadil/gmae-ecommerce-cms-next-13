import { prisma } from "@/config/db";
import { cache, memo, use } from "react";
import CreateBillForm from "./_components/create-bill-form";

const getUsers = cache(async (distributionId: string) => {
  const users = await prisma.user.findMany({
    select: { id: true, role: true, name: true },
    where: {
      role: { in: ["BOOKER", "SALES_MAN"] },
      distributors: { some: { id: distributionId } },
    },
  });
  return users;
});

const getCompanies = cache(async (distributionId: string) => {
  const companies = await prisma.companies.findMany({
    where: {
      distributors: { some: { id: distributionId } },
    },
  });
  return companies;
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
  const users = use(getUsers(params.distributionId));
  const companies = use(getCompanies(params.distributionId));
  const areas = use(getAreas(params.distributionId));
  return <CreateBillForm areas={areas} companies={companies} users={users} />;
});

Page.displayName = "Page";
export default Page;
