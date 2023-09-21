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
import { memo, useEffect } from "react";
// import { getProductsByCompanyId } from "../_actions/get-products-by-company-id";

type TCompany = {
  id: string;
  name: string | null;
};

const FindByCompany: React.FC<{
  companies: TCompany[];
}> = memo(({ companies }) => {
  const companyId = useBilling((state) => state.companyId);
  const setCompanyId = useBilling((state) => state.setCompanyId);
  const isFetching = useBilling((state) => state.isFetching);
  const setFetching = useBilling((state) => state.setFetching);
  const setItems = useBilling((state) => state.setItems);

  useEffect(() => {
    const getShops = async () => {
      setFetching(true);
      //   const items = await getProductsByCompanyId(companyId);
      //   setItems(items);
      setFetching(false);
    };
    if (companyId) getShops();
  }, [companyId]);

  return (
    <Popover>
      <PopoverTrigger disabled={isFetching} asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between",
            !companyId && "text-muted-foreground"
          )}
        >
          {companyId
            ? companies.find((s) => s.id === companyId)?.name
            : "Find By Company"}
          {/* <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" /> */}
          <Badge
            variant="secondary"
            className="text-[0.50rem]/[0.8rem] font-  py-0.5"
          >
            Company
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-72">
        <Command className="w-full">
          <CommandInput placeholder="Search Company..." />
          <CommandEmpty>No Company found.</CommandEmpty>
          <CommandGroup>
            {companies?.map((booker) => (
              <CommandItem
                value={booker.id}
                key={booker.id}
                onSelect={() => setCompanyId(booker.id)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    booker.id === companyId ? "opacity-100" : "opacity-0"
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
FindByCompany.displayName = "FindByCompany";
export default FindByCompany;
