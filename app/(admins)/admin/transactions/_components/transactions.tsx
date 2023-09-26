"use client";
import { memo, useEffect } from "react";
import TransactionItem from "./transaction-item";
import useTransaction from "@/store/use-transactions";

interface TTransactions {
  id: string;
  accessId: number;
  createdAt: Date;
}
const Transactions: React.FC<{
  initialTransactions: TTransactions[] | undefined;
}> = memo(({ initialTransactions }) => {
  const transactions = useTransaction((state) => state.transactions);
  const setTransactions = useTransaction((state) => state.setTransactions);
  const transactionId = useTransaction((state) => state.transactionId);
  const bookerId = useTransaction((state) => state.bookerId);
  const saleManId = useTransaction((state) => state.saleManId);
  const companyId = useTransaction((state) => state.companyId);
  const deliveryDate = useTransaction((state) => state.deliveryDate);
  const issueDate = useTransaction((state) => state.issueDate);
  const shopId = useTransaction((state) => state.shopId);
  useEffect(() => setTransactions(initialTransactions), []);
  useEffect(() => {
    if (
      transactionId.trim() === "" ||
      bookerId.trim() === "" ||
      saleManId.trim() === "" ||
      companyId.trim() === "" ||
      deliveryDate === "" ||
      issueDate === "" ||
      shopId.trim() === ""
    ) {
      setTransactions(initialTransactions);
    }
  }, [transactionId]);
  return (
    <div className="flex flex-col space-y-1">
      {transactions?.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
});
Transactions.displayName = "Transactions";
export default Transactions;
