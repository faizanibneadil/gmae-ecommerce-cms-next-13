import { _getTransactionById } from "@/queries";
import { PageProps } from "@/types";
import Print from "./_components/print-wrapper";

const Page: React.FC<PageProps> = async ({ params }) => {
  const transaction = await _getTransactionById({
    transactionId: params.transactionId,
  });
  return <Print transaction={transaction} />;
};

export default Page;
