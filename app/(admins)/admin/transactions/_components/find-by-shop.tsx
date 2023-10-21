"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import useTransaction from "@/store/use-transactions";
import { Check } from "lucide-react";
import { memo, useEffect } from "react";
import { getFilteredTransactions } from "../_actions/get-transactions-by-filters";

const FindByShop: React.FC<{}> = memo(() => {
  const areaId = useTransaction((state) => state.areaId).trim() == "";
  const shopId = useTransaction((state) => state.shopId);
  const setShopId = useTransaction((state) => state.setShopId);
  const shops = useTransaction((state) => state.shops);
  const setTransactions = useTransaction((state) => state.setTransactions);
  const setFetching = useTransaction((state) => state.setFetching);
  const isFetching = useTransaction((state) => state.isFetching);
  useEffect(() => {
    // Implement the database query function here
    if (shopId.trim() !== "") {
      // Trigger the database query function with the inputValue
      // and set the query result in state
      const action = async () => {
        setFetching(true);
        const t = await getFilteredTransactions({ shopId });
        setTransactions(t);
        setFetching(false);
      };
      action();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopId]);
  return (
    <Popover>
      <PopoverTrigger disabled={isFetching || Boolean(areaId)} asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between",
            !shopId && "text-muted-foreground"
          )}
        >
          {shopId ? shops?.find((s) => s.id === shopId)?.name : "Find By Shop"}
          {/* <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" /> */}
          <Badge
            variant="secondary"
            className="text-[0.50rem]/[0.8rem] font-  py-0.5"
          >
            Shop
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-72">
        <Command className="w-full">
          <CommandInput placeholder="Search Shop..." />
          <CommandEmpty>No Shop found.</CommandEmpty>
          <CommandGroup>
            {shops?.map((booker) => (
              <CommandItem
                value={booker.id}
                key={booker.id}
                onSelect={() => setShopId(booker.id)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    booker.id === shopId ? "opacity-100" : "opacity-0"
                  )}
                />
                {booker.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
});
FindByShop.displayName = "FindByShop";
export default FindByShop;
