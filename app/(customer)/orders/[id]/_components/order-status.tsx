"use client";
import { $Enums } from "@prisma/client";
import { memo, useEffect } from "react";

type TStatus = {
  id: string;
  name: $Enums.OrderStatus;
};

const OrderStatus: React.FC<{
  status: TStatus | undefined;
  statusWillChange: boolean;
}> = memo(({ status, statusWillChange }) => {
  useEffect(() => {
    if (statusWillChange) {
      const refreshInterval = setInterval(
        () => window.location.reload(),
        60000
      );
      return () => clearInterval(refreshInterval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-40 h-40 border rounded-full">
      <h1 className="text-xs">Order Status</h1>
      <h2>{status?.name}</h2>
    </div>
  );
});
OrderStatus.displayName = "OrderStatus";
export default OrderStatus;
