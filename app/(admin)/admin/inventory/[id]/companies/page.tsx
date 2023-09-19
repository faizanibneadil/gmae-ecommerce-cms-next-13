import { cache, memo, use } from "react";
import CompaniesForm from "./_components/companies-form";
import { prisma } from "@/config/db";

const getCompanies = cache(async (productId: string) => {
  const companies = await prisma.companies.findMany({
    select: {
      _count: {
        select: {
          products: true,
        },
      },
      id: true,
      name: true,
      products: {
        select: {
          id: true,
        },
        where: {
          id: productId,
        },
      },
    },
  });
  return companies;
});

const Page: React.FC<{
  params: { id: string };
}> = memo(({ params }) => {
  const companies = use(getCompanies(params.id));
  return <CompaniesForm companies={companies} />;
});

Page.displayName = "Page";
export default Page;
