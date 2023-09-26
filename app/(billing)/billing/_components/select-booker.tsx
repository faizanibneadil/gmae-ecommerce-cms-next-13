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

type TBookers = {
  id: string;
  name: string | null;
  role: $Enums.Role | null;
};

const SelectBooker: React.FC<{
  bookers: TBookers[];
}> = memo(({ bookers }) => {
  const bookerId = useBilling((state) => state.bookerId);
  const setBookerId = useBilling((state) => state.setBookerId);
  return (
    <Popover>
      <PopoverTrigger asChild>
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
            : "Select Booker"}
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
SelectBooker.displayName = "SelectBooker";
export default SelectBooker;
