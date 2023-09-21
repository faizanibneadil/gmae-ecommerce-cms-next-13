import { prisma } from "@/config/db";
import { notFound } from "next/navigation";
import { cache, memo, use } from "react";
import EditCompany from "./_components/edit-company-button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const getCompanies = cache(async () => {
  const companies = await prisma.companies.findMany({
    select: { id: true, name: true, _count: { select: { products: true } } },
  });
  return companies;
});
const Page: React.FC<{}> = memo(() => {
  const companies = use(getCompanies());
  return companies?.length ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
      {companies?.map((company) => (
        <div key={company.id} className="flex flex-col space-y-4">
          <Card className="flex flex-row items-center justify-between px-2 py-2">
            <div className="flex flex-row items-center space-x-2">
              <div className="flex flex-col">
                <p>{company.name}</p>
              </div>
            </div>
            <EditCompany id={company.id} />
          </Card>
        </div>
      ))}
    </div>
  ) : (
    notFound()
  );
});
Page.displayName = "Page";
export default Page;
