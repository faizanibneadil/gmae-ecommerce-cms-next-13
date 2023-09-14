import { $Enums } from "@prisma/client";
import { memo } from "react";

type TStatus = {
  id: string;
  name: $Enums.OrderStatus;
};

const OrderStatus: React.FC<{
  status: TStatus | undefined;
}> = memo(({ status }) => {
  return (
    <div className="flex flex-col items-center justify-center w-40 h-40 border rounded-full">
      <h1 className="text-xs">Order Status</h1>
      <h2>{status?.name}</h2>
    </div>
  );
});
OrderStatus.displayName = "OrderStatus";
export default OrderStatus;
