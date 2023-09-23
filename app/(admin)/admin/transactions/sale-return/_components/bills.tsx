"use client";

import useSaleReturn from "@/store/use-sale-return";
import { memo } from "react";
import Bill from "./bill";

const Bills: React.FC<{}> = memo(() => {
  const bills = useSaleReturn((state) => state.bills);
  return (
    <div className="flex flex-col space-y-1">
      {bills?.map((bill) => (
        <Bill key={bill.id} bill={bill} />
      ))}
    </div>
  );
});
Bills.displayName = "Bills";
export default Bills;
