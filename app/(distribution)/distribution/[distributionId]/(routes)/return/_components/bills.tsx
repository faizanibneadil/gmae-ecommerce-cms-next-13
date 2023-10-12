"use client";

import { memo } from "react";
import Bill from "./bill";

type TBills = {
  id: string;
  accessId: number;
  isReturned: boolean;
  createdAt: Date;
};

const Bills: React.FC<{
  bills: TBills[] | undefined;
}> = memo(({ bills }) => {
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
