import { prisma } from "@/config/db";
import { notFound } from "next/navigation";
import { cache, memo, use } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const getCompanies = cache(async (distributionId: string) => {
  const companies = await prisma.companies.findMany({
    select: { id: true, name: true, _count: { select: { products: true } } },
    where: { distributors: { some: { id: distributionId } } },
  });
  return companies;
});
const Page: React.FC<{
  params: { distributionId: string };
}> = memo(({ params }) => {
  const companies = use(getCompanies(params.distributionId));
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
      {companies?.map((company) => (
        <div key={company.id} className="flex flex-col space-y-4">
          <Card className="flex flex-row items-center justify-between px-2 py-2">
            <div className="flex flex-row items-center space-x-2">
              <div className="flex flex-col">
                <p>{company.name}</p>
              </div>
            </div>
            <Link
              href={`/distribution/${params.distributionId}/companies/${company.id}`}
            >
              Edit
            </Link>
          </Card>
        </div>
      ))}
    </div>
  );
});
Page.displayName = "Page";
export default Page;
