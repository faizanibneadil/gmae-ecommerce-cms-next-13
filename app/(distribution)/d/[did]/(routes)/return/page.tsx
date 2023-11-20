import { memo, use } from "react";
import SearchBills from "./_components/search-bills";
import { _getAreas, _getSalesMen } from "@/queries";

interface Props {
  params: { did: string };
}

const Page: React.FC<Props> = memo(({ params }) => {
  const saleMan = use(_getSalesMen(params.did));
  const areas = use(_getAreas(params.did));
  return <SearchBills saleMan={saleMan} areas={areas} />;
});

Page.displayName = "Page";
export default Page;
