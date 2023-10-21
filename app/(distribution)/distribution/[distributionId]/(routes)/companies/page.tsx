import { memo, use } from "react";
import { _getCompanies } from "@/queries";
import CompanyCard from "./_components/company-card";

interface Props {
  params: { distributionId: string };
}

const Page: React.FC<Props> = memo(({ params }) => {
  const companies = use(_getCompanies(params.distributionId));
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
      {companies?.map((company) => (
        <CompanyCard key={company.id} {...company} />
      ))}
    </div>
  );
});
Page.displayName = "Page";
export default Page;
