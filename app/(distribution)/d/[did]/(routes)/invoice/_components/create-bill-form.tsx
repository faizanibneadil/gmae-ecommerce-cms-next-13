"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { $Enums } from "@prisma/client";
import { memo, useEffect, useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Spin from "@/app/_components/loading-spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { createBillFormSchema } from "@/_schemas";
import { useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { CheckIcon } from "@/app/_components/icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import { _getInventoryByCompanyId, _getShopsByAreaId } from "@/queries";
import { $createInvoice } from "@/mutations";
import { toast } from "sonner";

type TUsers = {
  id: string;
  name: string | null;
  role: $Enums.Role | null;
};

type TCompanies = {
  id: string;
  name: string | null;
};

type TAreas = {
  id: string;
  name: string | null;
};

type TShops =
  | {
      id: string;
      name: string | null;
    }[]
  | undefined;

const CreateBillForm: React.FC<{
  users: TUsers[];
  companies: TCompanies[];
  areas: TAreas[];
}> = memo(({ areas, companies, users }) => {
  const did = useParams()?.did as string;
  const [shops, setShops] = useState<TShops>();
  const bookers = users.filter((u) => u.role === "BOOKER");
  const salesMen = users.filter((u) => u.role === "SALES_MAN");
  const form = useForm({
    resolver: zodResolver(createBillFormSchema),
    defaultValues: {
      id: uuidv4(),
      did: did,
      bookerId: "",
      saleManId: "",
      areaId: "",
      companyId: "",
      shopId: "",
      products: [],
      deliveryDate: addDays(new Date(), 1),
      extraDiscount: "",
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    // @ts-ignore
    name: "products",
  });

  const [isPending, startTransition] = useTransition();

  // Server Action
  const onSubmit = (values: any) => {
    toast.promise($createInvoice(values), {
      success: () => {
        const productsWithQty = form.getValues().products?.map((p: any) => ({
          ...p,
          qty: undefined,
        })) as never;
        form.setValue("shopId", "");
        form.setValue("extraDiscount", "");
        form.setValue("products", productsWithQty);
        return "Done.!";
      },
      error: "Something Wnt Wrong ...",
      loading: "Please Wait ...",
    });
  };

  useEffect(() => {
    if (form.watch("areaId")) {
      startTransition(async () => {
        const shops = await _getShopsByAreaId({
          areaId: form.watch("areaId"),
          did,
        });
        setShops(shops);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("areaId")]);

  useEffect(() => {
    if (form.watch("companyId")) {
      startTransition(async () => {
        const products = await _getInventoryByCompanyId({
          companyId: form.watch("companyId"),
          did,
        });
        const productsWithQty = products?.map((p: any) => ({
          ...p,
          qty: undefined,
        })) as never;
        form.setValue("products", productsWithQty);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("companyId")]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => <Input type="hidden" {...field} />}
        />
        <FormField
          control={form.control}
          name="did"
          render={({ field }) => <Input type="hidden" {...field} />}
        />
        <div className="grid content-center grid-cols-1 gap-x-1 gap-y-1 md:grid-cols-2">
          <FormField
            control={form.control}
            name="bookerId"
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
                          " justify-between w-full",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? bookers.find(
                              (bookers) => bookers.id === field.value
                            )?.name
                          : "Select bookers"}
                        <Badge
                          variant="secondary"
                          className="text-[0.50rem]/[0.8rem] font-  py-0.5"
                        >
                          Select Booker
                        </Badge>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-72">
                    <Command className="w-full">
                      <CommandInput
                        placeholder="Search Booker..."
                        className="h-9"
                      />
                      <CommandEmpty>No Booker found.</CommandEmpty>
                      <CommandGroup>
                        {bookers.map((booker) => (
                          <CommandItem
                            value={booker.id}
                            key={booker.id}
                            onSelect={() => {
                              form.setValue("bookerId", booker.id);
                            }}
                          >
                            {booker.name}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                booker.id === field.value
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
                {/* <FormDescription>asd</FormDescription> */}
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
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
                          ? salesMen.find(
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
                        {salesMen.map((saleMan) => (
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
          <FormField
            control={form.control}
            name="shopId"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-0">
                <FormLabel></FormLabel>
                <Popover>
                  <PopoverTrigger
                    disabled={!form.watch("areaId").length}
                    asChild
                  >
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
                          ? shops?.find((shop) => shop.id === field.value)?.name
                          : "Select Shop"}
                        <Badge
                          variant="secondary"
                          className="text-[0.50rem]/[0.8rem] font-  py-0.5"
                        >
                          Select Shop
                        </Badge>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-72">
                    <Command className="w-full">
                      <CommandInput
                        placeholder="Search Shop..."
                        className="h-9"
                      />
                      <CommandEmpty>No Shop found.</CommandEmpty>
                      <CommandGroup>
                        {shops?.map((shop) => (
                          <CommandItem
                            value={shop.id}
                            key={shop.id}
                            onSelect={() => {
                              form.setValue("shopId", shop.id);
                            }}
                          >
                            {shop.name}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                shop.id === field.value
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
            name="companyId"
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
                          ? companies.find(
                              (company) => company.id === field.value
                            )?.name
                          : "Select Company"}
                        <Badge
                          variant="secondary"
                          className="text-[0.50rem]/[0.8rem] font-  py-0.5"
                        >
                          Select Company
                        </Badge>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-72">
                    <Command className="w-full">
                      <CommandInput
                        placeholder="Search Company..."
                        className="h-9"
                      />
                      <CommandEmpty>No Company found.</CommandEmpty>
                      <CommandGroup>
                        {companies.map((company) => (
                          <CommandItem
                            value={company.id}
                            key={company.id}
                            onSelect={() => {
                              form.setValue("companyId", company.id);
                            }}
                          >
                            {company.name}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                company.id === field.value
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
            name="deliveryDate"
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
                        {field.value ? (
                          format(field.value as Date, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <Badge
                          variant="secondary"
                          className="text-[0.50rem]/[0.8rem] font-  py-0.5"
                        >
                          Select Delivery Date
                        </Badge>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-72">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {/* <FormDescription></FormDescription> */}
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <Command>
          <div className="border">
            <CommandInput
              disabled={!form.watch("companyId")}
              placeholder="Search Product..."
            />
          </div>
          <CommandList className="border-none max-h-fit">
            <CommandEmpty>No results found.</CommandEmpty>
            {fields?.map((field: any, index: number) => (
              <CommandItem key={field.id} className="mb-2 border first:mt-2">
                <div className="flex flex-col w-full space-y-1">
                  <div className="text-base">{field.title}</div>
                  <div className="flex flex-row items-center justify-between space-x-1">
                    <Badge className="text-xs">Stock: {field.stock}</Badge>
                    <Input
                      key={field.id}
                      // @ts-expect-error
                      {...form.register(`products.${index}.qty`)}
                      placeholder="quantity"
                      className="w-20 h-6 p-1 text-xs font-normal text-center rounded-full"
                    />
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandList>
        </Command>

        <FormField
          control={form.control}
          name="extraDiscount"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-0">
              <FormLabel></FormLabel>
              <FormControl>
                <Input
                  disabled={!form.watch("companyId")}
                  onChange={field.onChange}
                  value={field.value}
                  placeholder="Extra Discount amount."
                />
              </FormControl>
              {/* <FormDescription></FormDescription> */}
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <Button type="submit" variant="outline" className="w-full">
          {isPending || form.formState.isSubmitting ? <Spin /> : `Save`}
        </Button>
      </form>
    </Form>
  );
});
CreateBillForm.displayName = "CreateBillForm";
export default CreateBillForm;
