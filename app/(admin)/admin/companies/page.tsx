import { prisma } from "@/config/db";
import { notFound } from "next/navigation";
import { cache, memo, use } from "react";
import EditCompany from "./_components/edit-company-button";

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
      {companies?.map((c) => (
        <div
          key={c.id}
          className="flex flex-row items-center justify-between p-4 border rounded-lg"
        >
          <h2 className="text-base">{c.name}</h2>
          <EditCompany id={c.id} />
        </div>
      ))}
    </div>
  ) : (
    notFound()
  );
});
Page.displayName = "Page";
export default Page;
