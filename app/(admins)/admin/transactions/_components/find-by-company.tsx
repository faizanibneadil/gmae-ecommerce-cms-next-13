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

type TCompany = {
  id: string;
  name: string | null;
};

const FindByCompany: React.FC<{
  companies: TCompany[];
}> = memo(({ companies }) => {
  const companyId = useTransaction((state) => state.companyId);
  const setCompanyId = useTransaction((state) => state.setCompanyId);
  const setTransactions = useTransaction((state) => state.setTransactions);
  const setFetching = useTransaction((state) => state.setFetching);
  const isFetching = useTransaction((state) => state.isFetching);
  useEffect(() => {
    // Implement the database query function here
    if (companyId.trim() !== "") {
      // Trigger the database query function with the inputValue
      // and set the query result in state
      const action = async () => {
        setFetching(true);
        const t = await getFilteredTransactions({ companyId });
        setTransactions(t);
        setFetching(false);
      };
      action();
    }
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
            {companies?.map((company) => (
              <CommandItem
                value={company.id}
                key={company.id}
                onSelect={() => setCompanyId(company.id)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    company.id === companyId ? "opacity-100" : "opacity-0"
                  )}
                />
                {company.name}
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
