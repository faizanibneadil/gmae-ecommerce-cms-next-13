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
import { memo, useEffect, useTransition } from "react";
// import { getShopsByAreaId } from "../_actions/get-shops-by-area-id";

type TAreas = {
  id: string;
  name: string | null;
};

const FindByArea: React.FC<{
  areas: TAreas[];
}> = memo(({ areas }) => {
  const areaId = useBilling((state) => state.areaId);
  const setAreaId = useBilling((state) => state.setAreaId);
  const setShops = useBilling((state) => state.setShops);
  const isFetching = useBilling((state) => state.isFetching);
  const setFetching = useBilling((state) => state.setFetching);

  useEffect(() => {
    const getShops = async () => {
      setFetching(true);
      //   const shops = await getShopsByAreaId(areaId);
      //   setShops(shops);
      setFetching(false);
    };
    if (areaId) getShops();
  }, [areaId]);

  return (
    <Popover>
      <PopoverTrigger disabled={isFetching} asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between",
            !areaId && "text-muted-foreground"
          )}
        >
          {areaId ? areas.find((s) => s.id === areaId)?.name : "Find By Area"}
          {/* <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" /> */}
          <Badge
            variant="secondary"
            className="text-[0.50rem]/[0.8rem] font-  py-0.5"
          >
            Area
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-72">
        <Command className="w-full">
          <CommandInput placeholder="Search Area..." />
          <CommandEmpty>No Area found.</CommandEmpty>
          <CommandGroup>
            {areas?.map((booker) => (
              <CommandItem
                value={booker.id}
                key={booker.id}
                onSelect={() => setAreaId(booker.id)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    booker.id === areaId ? "opacity-100" : "opacity-0"
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
FindByArea.displayName = "FindByArea";
export default FindByArea;
