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

type TSaleManes = {
  id: string;
  name: string | null;
  role: $Enums.Role | null;
};

const FindBySaleMane: React.FC<{
  saleManes: TSaleManes[];
}> = memo(({ saleManes }) => {
  const saleManeId = useBilling((state) => state.saleManeId);
  const setSaleManeId = useBilling((state) => state.setSaleManeId);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between",
            !saleManeId && "text-muted-foreground"
          )}
        >
          {saleManeId
            ? saleManes.find((s) => s.id === saleManeId)?.name
            : "Find By Sale Mane"}
          {/* <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" /> */}
          <Badge
            variant="secondary"
            className="text-[0.50rem]/[0.8rem] font-  py-0.5"
          >
            Sale Mane
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-72">
        <Command className="w-full">
          <CommandInput placeholder="Search Sale Mane..." />
          <CommandEmpty>No Sale Mane found.</CommandEmpty>
          <CommandGroup>
            {saleManes?.map((saleMane) => (
              <CommandItem
                value={saleMane.id}
                key={saleMane.id}
                onSelect={() => setSaleManeId(saleMane.id)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    saleMane.id === saleManeId ? "opacity-100" : "opacity-0"
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
FindBySaleMane.displayName = "FindBySaleMane";
export default FindBySaleMane;
