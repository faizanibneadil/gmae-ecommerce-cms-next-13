"use client";

import { memo, useEffect } from "react";
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
import useSaleReturn from "@/store/use-sale-return";

type TProducts = {
  id: string;
  products: {
    id: string;
    title: string | null;
  }[];
  quantity: number | null;
};

const BillingProducts: React.FC<{
  products: TProducts[] | undefined;
  isReturned: boolean | undefined;
}> = memo(({ products, isReturned }) => {
  const setItems = useSaleReturn((state) => state.setItems);
  const items = useSaleReturn((state) => state.items);
  useEffect(() => setItems(products), []);
  const messages = useSaleReturn((state) => state.messages);
  return (
    <>
      <p className="flex flex-row flex-wrap gap-x-1 gap-y-1">
        {messages?.map((m) => (
          <Badge key={m} variant="destructive">
            {m}
          </Badge>
        ))}
      </p>
      <Command>
        <div className="border">
          <CommandInput placeholder="Search Product..." />
        </div>
        <CommandList className="border-none max-h-fit">
          <CommandEmpty>No results found.</CommandEmpty>
          {items?.map((product) => (
            <BillingItem
              key={product.id}
              isReturned={isReturned}
              id={product.id}
              quantity={product.quantity}
              title={product.products[0].title}
            />
          ))}
        </CommandList>
      </Command>
    </>
  );
});
BillingProducts.displayName = "BillingProducts";
export default BillingProducts;
