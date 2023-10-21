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

type TBookers = {
  id: string;
  name: string | null;
  role: $Enums.Role | null;
};

const FindByBooker: React.FC<{
  bookers: TBookers[];
}> = memo(({ bookers }) => {
  const bookerId = useTransaction((state) => state.bookerId);
  const setBookerId = useTransaction((state) => state.setBookerId);
  const setTransactions = useTransaction((state) => state.setTransactions);
  const setFetching = useTransaction((state) => state.setFetching);
  const isFetching = useTransaction((state) => state.isFetching);
  useEffect(() => {
    // Implement the database query function here
    if (bookerId.trim() !== "") {
      // Trigger the database query function with the inputValue
      // and set the query result in state
      const action = async () => {
        setFetching(true);
        const t = await getFilteredTransactions({ bookerId });
        setTransactions(t);
        setFetching(false);
      };
      action();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookerId]);
  return (
    <Popover>
      <PopoverTrigger disabled={isFetching} asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between",
            !bookerId && "text-muted-foreground"
          )}
        >
          {bookerId
            ? bookers.find((s) => s.id === bookerId)?.name
            : "Find By Booker"}
          {/* <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" /> */}
          <Badge
            variant="secondary"
            className="text-[0.50rem]/[0.8rem] font-  py-0.5"
          >
            Booker
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-72">
        <Command className="w-full">
          <CommandInput placeholder="Search Booker..." />
          <CommandEmpty>No Booker found.</CommandEmpty>
          <CommandGroup>
            {bookers?.map((booker) => (
              <CommandItem
                value={booker.id}
                key={booker.id}
                onSelect={() => setBookerId(booker.id)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    booker.id === bookerId ? "opacity-100" : "opacity-0"
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
FindByBooker.displayName = "FindByBooker";
export default FindByBooker;
