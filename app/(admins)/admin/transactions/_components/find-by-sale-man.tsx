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
import { $Enums } from "@prisma/client";
import { Check } from "lucide-react";
import { memo, useEffect } from "react";
import { getFilteredTransactions } from "../_actions/get-transactions-by-filters";

type TSaleMen = {
  id: string;
  name: string | null;
  role: $Enums.Role | null;
};

const FindBySaleMan: React.FC<{
  saleMen: TSaleMen[];
}> = memo(({ saleMen }) => {
  const saleManId = useTransaction((state) => state.saleManId);
  const setSaleManId = useTransaction((state) => state.setSaleManId);
  const setTransactions = useTransaction((state) => state.setTransactions);
  const setFetching = useTransaction((state) => state.setFetching);
  const isFetching = useTransaction((state) => state.isFetching);

  useEffect(() => {
    // Implement the database query function here
    if (saleManId.trim() !== "") {
      // Trigger the database query function with the inputValue
      // and set the query result in state
      const action = async () => {
        setFetching(true);
        const t = await getFilteredTransactions({ saleManId });
        setTransactions(t);
        setFetching(false);
      };
      action();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saleManId]);
  return (
    <Popover>
      <PopoverTrigger disabled={isFetching} asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between",
            !saleManId && "text-muted-foreground"
          )}
        >
          {saleManId
            ? saleMen.find((s) => s.id === saleManId)?.name
            : "Find By Sale Man"}
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
          <CommandInput placeholder="Search Sale Mane..." />
          <CommandEmpty>No Sale Mane found.</CommandEmpty>
          <CommandGroup>
            {saleMen?.map((saleMane) => (
              <CommandItem
                value={saleMane.id}
                key={saleMane.id}
                onSelect={() => setSaleManId(saleMane.id)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    saleMane.id === saleManId ? "opacity-100" : "opacity-0"
                  )}
                />
                {saleMane.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
});
FindBySaleMan.displayName = "FindBySaleMan";
export default FindBySaleMan;
