import { prisma } from "@/config/db";
import { cache, memo, use } from "react";
import CreateCompanyForm from "./_components/create-company-form";

const getCompany = cache(async (id: string) => {
  const company = await prisma.companies.findUnique({ where: { id } });
  return company;
});

const Page: React.FC<{
  params: { id: string };
}> = memo(({ params }) => {
  const company = use(getCompany(params?.id));
  return <CreateCompanyForm company={company} />;
});

Page.displayName = "Page";
export default Page;
