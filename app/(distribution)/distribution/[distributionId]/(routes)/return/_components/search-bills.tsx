"use client";

import { memo, useEffect, useState } from "react";
import { $Enums } from "@prisma/client";
import { updateBill } from "../_actions/sale-return";
import Bills from "./bills";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { CheckIcon } from "@/app/_components/icons";
import { toast } from "sonner";
import { useParams } from "next/navigation";

type TBookers = {
  id: string;
  name: string | null;
  role: $Enums.Role | null;
};

type TAreas = {
  id: string;
  name: string | null;
};

type TBills = {
  id: string;
  accessId: number;
  isReturned: boolean;
  createdAt: Date;
};

const SearchBills: React.FC<{
  saleMan: TBookers[];
  areas: TAreas[];
}> = memo(({ saleMan, areas }) => {
  const distributionId = useParams()?.distributionId as string;
  const [bills, setBills] = useState<TBills[]>();
  const form = useForm({
    defaultValues: {
      saleManId: "",
      areaId: "",
    },
  });

  useEffect(() => {
    if (form.watch("areaId") && form.watch("saleManId")) {
      toast.promise(
        updateBill({
          areaId: form.watch("areaId"),
          saleManId: form.watch("saleManId"),
          distributionId: distributionId,
        }),
        {
          loading: "Fetching ...",
          error: "Something Went Wrong.",
          success: (data) => {
            setBills(data);
            return "Ready.";
          },
        }
      );
    }
  }, [form.watch("areaId"), form.watch("saleManId")]);
  return (
    <div className="space-y-2">
      <div className="grid content-center grid-cols-1 gap-x-1 gap-y-1 md:grid-cols-2">
        <Form {...form}>
          <FormField
            control={form.control}
            name="saleManId"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-0">
                <FormLabel></FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? saleMan.find(
                              (saleMan) => saleMan.id === field.value
                            )?.name
                          : "Select Sale Man"}
                        <Badge
                          variant="secondary"
                          className="text-[0.50rem]/[0.8rem] font-  py-0.5"
                        >
                          Select Sale Man
                        </Badge>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-72">
                    <Command className="w-full">
                      <CommandInput
                        placeholder="Search Sale Man..."
                        className="h-9"
                      />
                      <CommandEmpty>No Sale Man found.</CommandEmpty>
                      <CommandGroup>
                        {saleMan.map((saleMan) => (
                          <CommandItem
                            value={saleMan.id}
                            key={saleMan.id}
                            onSelect={() => {
                              form.setValue("saleManId", saleMan.id);
                            }}
                          >
                            {saleMan.name}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                saleMan.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                {/* <FormDescription></FormDescription> */}
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="areaId"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-0">
                <FormLabel></FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? areas.find((area) => area.id === field.value)?.name
                          : "Select Area"}
                        <Badge
                          variant="secondary"
                          className="text-[0.50rem]/[0.8rem] font-  py-0.5"
                        >
                          Select Area
                        </Badge>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-72">
                    <Command className="w-full">
                      <CommandInput
                        placeholder="Search Area..."
                        className="h-9"
                      />
                      <CommandEmpty>No Area found.</CommandEmpty>
                      <CommandGroup>
                        {areas.map((area) => (
                          <CommandItem
                            value={area.id}
                            key={area.id}
                            onSelect={() => {
                              form.setValue("areaId", area.id);
                            }}
                          >
                            {area.name}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                area.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                {/* <FormDescription></FormDescription> */}
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </Form>
      </div>
      <Bills bills={bills} />
    </div>
  );
});
SearchBills.displayName = "SearchBills";
export default SearchBills;
