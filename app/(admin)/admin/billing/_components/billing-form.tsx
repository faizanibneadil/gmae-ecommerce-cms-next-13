"use client";

import { memo, useEffect, useState, useTransition } from "react";
import { createProductAction } from "@/_actions";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Spin from "@/app/_components/loading-spinner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { $Enums } from "@prisma/client";
import { v4 as uuidV4 } from "uuid";
import { format, addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getShopsByAreaId } from "../_actions/get-shops-by-area-id";
import { getProductsByCompanyId } from "../_actions/get-products-by-company-id";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { MinusIcon, PlusIcon } from "@/app/_components/icons";

type TSalesMans = {
  id: string;
  name: string | null;
  role: $Enums.Role | null;
};

type TCompanies = {
  id: string;
  name: string | null;
};

type TShops = {
  id: string;
  name: string | null;
};

type TAreas = {
  id: string;
  name: string | null;
};

type TProducts = {
  images: {
    src: string | null;
  }[];
  id: string;
  title: string | null;
  regularPrice: number | null;
  salePrice: number | null;
  stock: number | null;
};

const BillingForm: React.FC<{
  users: TSalesMans[];
  companies: TCompanies[];
  areas: TAreas[];
}> = memo(({ users, companies, areas }) => {
  const [fetchingShops, fetchShops] = useTransition();
  const [shops, setShops] = useState<TShops[]>();

  const [fetchingProducts, fetchProducts] = useTransition();
  const [products, setProducts] = useState<TProducts[]>();

  const bookers = users.filter((u) => u.role === "BOOKER");
  const salesMans = users.filter((u) => u.role === "SALES_MAN");

  const form = useForm({
    defaultValues: {
      id: uuidV4(),
      bookerId: "",
      saleManeId: "",
      areaId: "",
      shopId: "",
      companyId: "",
      deliveryDate: addDays(new Date(), 1),
    },
  });
  const [isPending, startTransition] = useTransition();

  // Server Action
  const onSubmit = (values: any) => {
    startTransition(() => {
      return console.log(values);
    });
  };

  // Event handler for areaId change
  useEffect(() => {
    // Check if areaId is not empty
    if (form.watch("areaId")) {
      // Fetch data shops on areaId
      const areaId = form.watch("areaId");
      fetchShops(async () => {
        const shops = await getShopsByAreaId(areaId);
        setShops(shops);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("areaId")]); // Run this effect when areaId changes

  // Event handler for companyId change
  useEffect(() => {
    // Check if companyId is not empty
    if (form.watch("companyId")) {
      // Fetch data shops on companyId
      const companyId = form.watch("companyId");
      fetchProducts(async () => {
        const products = await getProductsByCompanyId(companyId);
        setProducts(products);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("companyId")]); // Run this effect when companyId changes

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <Input type="hidden" placeholder="Product Title" {...field} />
          )}
        />
        <div className="grid content-center grid-cols-1 gap-x-1 gap-y-1 md:grid-cols-3">
          {/* // booker Input  */}
          <FormField
            control={form.control}
            name="bookerId"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-0">
                {/* <FormLabel>Choose Booker.</FormLabel> */}
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
                          ? bookers.find((s) => s.id === field.value)?.name
                          : "Select Booker"}
                        {/* <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" /> */}
                        <Badge
                          variant="secondary"
                          className="text-[0.50rem]/[0.8rem] font-  py-0.5"
                        >
                          Booker
                        </Badge>
                      </Button>
                    </FormControl>
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
                            onSelect={() => {
                              form.setValue("bookerId", booker.id);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                booker.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {booker.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* sales man input  */}
          <FormField
            control={form.control}
            name="saleManeId"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-0">
                {/* <FormLabel>Choose Sale Man.</FormLabel> */}
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
                          ? salesMans.find((s) => s.id === field.value)?.name
                          : "Select Sale Mane"}
                        {/* <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" /> */}
                        <Badge
                          variant="secondary"
                          className="text-[0.50rem]/[0.8rem] font-  py-0.5"
                        >
                          Sale Mane
                        </Badge>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-72">
                    <Command className="w-full">
                      <CommandInput placeholder="Search Sale Manes..." />
                      <CommandEmpty>No Sale Mane found.</CommandEmpty>
                      <CommandGroup>
                        {salesMans?.map((mane) => (
                          <CommandItem
                            value={mane.id}
                            key={mane.id}
                            onSelect={() => {
                              form.setValue("saleManeId", mane.id);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                mane.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {mane.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Area Input input  */}
          <FormField
            control={form.control}
            name="areaId"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-0">
                {/* <FormLabel>Choose Area.</FormLabel> */}
                <Popover>
                  <PopoverTrigger disabled={fetchingShops} asChild>
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
                          ? areas?.find((s) => s.id === field.value)?.name
                          : "Select Area"}
                        {/* <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" /> */}
                        <Badge
                          variant="secondary"
                          className="text-[0.50rem]/[0.8rem] font-  py-0.5"
                        >
                          Area
                        </Badge>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-72">
                    <Command className="w-full">
                      <CommandInput placeholder="Search Areas..." />
                      <CommandEmpty>No Area found.</CommandEmpty>
                      <CommandGroup>
                        {areas?.map((area) => (
                          <CommandItem
                            value={area.id}
                            key={area.id}
                            onSelect={() => {
                              form.setValue("areaId", area.id);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                area.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {area.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Shops input  */}
          <FormField
            control={form.control}
            name="shopId"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-0">
                {/* <FormLabel>Choose Shop.</FormLabel> */}
                <Popover>
                  <PopoverTrigger disabled={fetchingShops} asChild>
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
                          ? shops?.find((s) => s.id === field.value)?.name
                          : "Select Shop"}
                        {/* <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" /> */}
                        <Badge
                          variant="secondary"
                          className="text-[0.50rem]/[0.8rem] font-  py-0.5"
                        >
                          Shop
                        </Badge>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-72">
                    <Command className="w-full">
                      <CommandInput placeholder="Search Shop..." />
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
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                shop.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {shop.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* // Companies Input  */}
          <FormField
            control={form.control}
            name="companyId"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-0">
                {/* <FormLabel>Choose Company.</FormLabel> */}
                <Popover>
                  <PopoverTrigger disabled={fetchingProducts} asChild>
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
                          ? companies.find((s) => s.id === field.value)?.name
                          : "Select Company"}
                        {/* <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" /> */}
                        <Badge
                          variant="secondary"
                          className="text-[0.50rem]/[0.8rem] font-  py-0.5"
                        >
                          Company
                        </Badge>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-72">
                    <Command className="w-full">
                      <CommandInput placeholder="Search Booker..." />
                      <CommandEmpty>No Company found.</CommandEmpty>
                      <CommandGroup>
                        {companies?.map((company) => (
                          <CommandItem
                            value={company.id}
                            key={company.id}
                            onSelect={() => {
                              form.setValue("companyId", company.id);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                company.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {company.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Delivery Date input  */}
          <FormField
            control={form.control}
            name="deliveryDate"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-0">
                {/* <FormLabel>Delivery Date</FormLabel> */}
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a Delivery date</span>
                        )}
                        {/* <CalendarIcon className="w-4 h-4 ml-auto opacity-50" /> */}
                        <Badge
                          variant="secondary"
                          className="text-[0.50rem]/[0.8rem] ml-auto  py-0.5"
                        >
                          Delivery date
                        </Badge>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* // Products List  */}
        <Command>
          <CommandInput
            disabled={fetchingProducts}
            placeholder="Search Product..."
          />
          <CommandList className="max-h-fit">
            <CommandEmpty>No results found.</CommandEmpty>
            {products?.map((product) => (
              <CommandItem
                key={product.id}
                disabled={fetchingProducts}
                className="border-b"
              >
                <div className="flex flex-col w-full space-y-1">
                  <div>{product.title}</div>
                  <div className="flex flex-row items-center justify-between space-x-1">
                    <Badge className="text-xs">Stock: {product.stock}</Badge>
                    <Badge
                      variant="outline"
                      className="flex items-center space-x-1 px-0.5"
                    >
                      <Badge className="px-0.5" variant="destructive">
                        <MinusIcon className="w-4 h-4" />
                      </Badge>
                      <Input
                        placeholder="quantity"
                        className="w-20 h-6 p-1 text-xs font-normal text-center rounded-full"
                      />
                      <Badge className="px-0.5" variant="default">
                        <PlusIcon className="w-4 h-4" />
                      </Badge>
                    </Badge>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandList>
        </Command>

        <Button type="submit" variant="outline" className="w-full">
          {isPending ? <Spin /> : `Save`}
        </Button>
      </form>
    </Form>
  );
});
BillingForm.displayName = "BillingForm";
export default BillingForm;
