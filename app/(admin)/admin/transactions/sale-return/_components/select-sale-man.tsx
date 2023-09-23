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
import useSaleReturn from "@/store/use-sale-return";
import { $Enums } from "@prisma/client";
import { Check } from "lucide-react";
import { memo } from "react";

type TSaleManes = {
  id: string;
  name: string | null;
  role: $Enums.Role | null;
};

const SelectSaleMan: React.FC<{
  saleMan: TSaleManes[];
}> = memo(({ saleMan }) => {
  const saleManId = useSaleReturn((state) => state.saleManId);
  const setSaleManId = useSaleReturn((state) => state.setSaleManId);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between",
            !saleManId && "text-muted-foreground"
          )}
        >
          {saleManId
            ? saleMan.find((s) => s.id === saleManId)?.name
            : "Select Sale Man"}
          {/* <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" /> */}
          <Badge
            variant="secondary"
            className="text-[0.50rem]/[0.8rem] font-  py-0.5"
          >
            Sale Man
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-72">
        <Command className="w-full">
          <CommandInput placeholder="Search Sale Man..." />
          <CommandEmpty>No Sale Man found.</CommandEmpty>
          <CommandGroup>
            {saleMan?.map((booker) => (
              <CommandItem
                value={booker.id}
                key={booker.id}
                onSelect={() => setSaleManId(booker.id)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    booker.id === saleManId ? "opacity-100" : "opacity-0"
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
SelectSaleMan.displayName = "SelectSaleMan";
export default SelectSaleMan;
