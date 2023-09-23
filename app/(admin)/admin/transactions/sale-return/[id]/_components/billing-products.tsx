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

const BillingProducts: React.FC<{
  products:
    | {
        id: string;
        products: {
          title: string | null;
        }[];
        quantity: number | null;
      }[]
    | undefined;
}> = memo(({ products }) => {
  return (
    <Command>
      <div className="border">
        <CommandInput placeholder="Search Product..." />
      </div>
      <CommandList className="border-none max-h-fit">
        <CommandEmpty>No results found.</CommandEmpty>
        {products?.map((product) => (
          <BillingItem
            key={product.id}
            id={product.id}
            quantity={product.quantity}
            title={product.products[0].title}
          />
        ))}
      </CommandList>
    </Command>
  );
});
BillingProducts.displayName = "BillingProducts";
export default BillingProducts;
