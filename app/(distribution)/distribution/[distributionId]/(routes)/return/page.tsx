import { memo, use } from "react";
import SearchBills from "./_components/search-bills";
import { _getAreas, _getSalesMen } from "@/queries";

interface Props {
  params: { distributionId: string };
}

const Page: React.FC<Props> = memo(({ params }) => {
  const saleMan = use(_getSalesMen(params.distributionId));
  const areas = use(_getAreas(params.distributionId));
  return <SearchBills saleMan={saleMan} areas={areas} />;
});

Page.displayName = "Page";
export default Page;
