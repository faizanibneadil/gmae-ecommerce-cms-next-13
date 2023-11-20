import CompaniesForm from "./_components/companies-form";
import { _getCompaniesWithProductsCount } from "@/queries";

interface Props {
  params: { inventoryId: string; did: string };
}

const Page: React.FC<Props> = async ({ params }) => {
  const companies = await _getCompaniesWithProductsCount({
    productId: params.inventoryId,
    did: params.did,
  });

  return <CompaniesForm companies={companies} />;
};

export default Page;
