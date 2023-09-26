import { Card } from "@/components/ui/card";
import { priceFormatter } from "@/lib/utils";
import { memo } from "react";

const OrderSummery: React.FC<{
  discount: number | undefined;
  total: number | undefined;
}> = memo(({ discount, total }) => {
  return (
    <div className="w-full">
      <h2 className="mt-4 text-sm font-semibold">Order Summery.</h2>
      <Card className="mt-2 divide-y">
        <div className="flex items-center justify-between px-4 py-2">
          <div>Discount</div>
          <div>{priceFormatter.format(Number(discount))}</div>
        </div>
        <div className="flex items-center justify-between px-4 py-2">
          <div>Total</div>
          <div>{priceFormatter.format(Number(total))}</div>
        </div>
      </Card>
    </div>
  );
});
OrderSummery.displayName = "OrderSummery";
export default OrderSummery;
