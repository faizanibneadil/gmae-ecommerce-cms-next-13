import CompaniesForm from "./_components/companies-form";
import { _getCompaniesWithProductsCount } from "@/queries";

interface Props {
  params: { inventoryId: string; distributionId: string };
}

const Page: React.FC<Props> = async ({ params }) => {
  const companies = await _getCompaniesWithProductsCount({
    productId: params.inventoryId,
    distributionId: params.distributionId,
  });

  return <CompaniesForm companies={companies} />;
};

export default Page;
