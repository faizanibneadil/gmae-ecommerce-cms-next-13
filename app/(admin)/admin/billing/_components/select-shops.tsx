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
import useBilling from "@/store/use-billing";
import { $Enums } from "@prisma/client";
import { Check } from "lucide-react";
import { memo } from "react";

const SelectShop: React.FC<{}> = memo(() => {
  const shopId = useBilling((state) => state.shopId);
  const setShopId = useBilling((state) => state.setShopId);
  const isFetching = useBilling((state) => state.isFetching);
  const shops = useBilling((state) => state.shops);
  return (
    <Popover>
      <PopoverTrigger disabled={isFetching} asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between",
            !shopId && "text-muted-foreground"
          )}
        >
          {shopId ? shops?.find((s) => s.id === shopId)?.name : "Select Shop"}
          {/* <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" /> */}
          <Badge
            variant="secondary"
            className="text-[0.50rem]/[0.8rem] font-  py-0.5"
          >
            Select Shop
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
SelectShop.displayName = "SelectShop";
export default SelectShop;
