"use client";

import { Badge } from "@/components/ui/badge";
import { CommandItem } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import useBilling from "@/store/use-billing";
import { memo } from "react";

const BillingItem: React.FC<{
  id: string;
  title: string;
  stock: number;
}> = memo(({ id, stock, title }) => {
  const isFetching = useBilling((state) => state.isFetching);
  const setQty = useBilling((state) => state.setQty);
  const qty = useBilling((state) => state.getQty);
  return (
    <CommandItem disabled={isFetching} className="mb-2 border first:mt-2">
      <div className="flex flex-col w-full space-y-1">
        <div className="text-base">{title}</div>
        <div className="flex flex-row items-center justify-between space-x-1">
          <Badge className="text-xs">Stock: {stock}</Badge>
          <Input
            value={qty(id)}
            onChange={(e) => setQty(id, Number(e.target.value))}
            placeholder="quantity"
            className="w-20 h-6 p-1 text-xs font-normal text-center rounded-full"
          />
        </div>
      </div>
    </CommandItem>
  );
});
BillingItem.displayName = "BillingItem";
export default BillingItem;
