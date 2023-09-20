"use client";

import { memo } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import useBilling from "@/store/use-billing";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import BillingItem from "./billing-item";

const BillingProducts: React.FC<{}> = memo(() => {
  const isFetching = useBilling((state) => state.isFetching);
  const products = useBilling((state) => state.items);
  return (
    <Command>
      <div className="border">
        <CommandInput disabled={isFetching} placeholder="Search Product..." />
      </div>
      <CommandList className="border-none max-h-fit">
        <CommandEmpty>No results found.</CommandEmpty>
        {products?.map((product: any) => (
          <BillingItem key={product.id} {...product} />
        ))}
      </CommandList>
    </Command>
  );
});
BillingProducts.displayName = "BillingProducts";
export default BillingProducts;
