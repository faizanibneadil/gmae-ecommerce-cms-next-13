"use client";

import { Input } from "@/components/ui/input";
import useSaleReturn from "@/store/use-sale-return";
import { memo } from "react";

const DiscountInput: React.FC<{
  isReturned: boolean | undefined;
}> = memo(({ isReturned }) => {
  const extraDiscount = useSaleReturn((state) => state.extraDiscount);
  const setExtraDiscount = useSaleReturn((state) => state.setExtraDiscount);
  return (
    <Input
      disabled={isReturned}
      value={extraDiscount}
      onChange={(e) => setExtraDiscount(e.target.value)}
      placeholder="Bill Discount ..."
    />
  );
});
DiscountInput.displayName = "DiscountInput";
export default DiscountInput;
