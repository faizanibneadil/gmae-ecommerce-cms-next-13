"use client";

import { Input } from "@/components/ui/input";
import useTransaction from "@/store/use-transactions";
import { memo, useEffect } from "react";
import { getFilteredTransactions } from "../_actions/get-transactions-by-filters";

const FindByTransactionId: React.FC<{}> = memo(() => {
  const transactionId = useTransaction((state) => state.transactionId);
  const setTransactionId = useTransaction((state) => state.setTransactionId);
  const setTransactions = useTransaction((state) => state.setTransactions);
  const setFetching = useTransaction((state) => state.setFetching);
  const isFetching = useTransaction((state) => state.isFetching);
  useEffect(() => {
    // Implement the database query function here
    if (transactionId.trim() !== "") {
      // Trigger the database query function with the inputValue
      // and set the query result in state
      const action = async () => {
        setFetching(true);
        const t = await getFilteredTransactions({
          transactionId: +transactionId,
        });
        setTransactions(t);
        setFetching(false);
      };
      action();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionId]);
  return (
    <Input
      disabled={isFetching}
      value={transactionId}
      onChange={(e) => setTransactionId(e.target.value)}
      placeholder="Find By ID"
    />
  );
});
FindByTransactionId.displayName = "FindByTransactionId";
export default FindByTransactionId;
