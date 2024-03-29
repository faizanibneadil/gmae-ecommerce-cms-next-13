"use client";

import { memo, startTransition } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CancelBill from "./cancel-bill";
import { Button } from "@/components/ui/button";
import { saveBill } from "../_actions/save-bill";

type TProducts = {
  id: string;
  products: {
    id: string;
    title: string | null;
    regularPrice: number | null;
    salePrice: number | null;
    profit: number | null;
  }[];
  issueQuantity: number | null;
};

const BillingProducts: React.FC<{
  products: TProducts[] | undefined;
  isReturned: boolean | undefined;
}> = memo(({ products, isReturned }) => {
  const form = useForm({
    defaultValues: {
      billId: useParams()?.id as string,
      did: useParams()?.did as string,
      items: products,
      extraDiscount: "",
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "items" as never,
  });

  // Server Action
  const onSubmit = async (values: any) => {
    await saveBill(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
        <Command>
          <div className="border">
            <CommandInput placeholder="Search Product..." />
          </div>
          <CommandList className="border-none max-h-fit">
            <CommandEmpty>No results found.</CommandEmpty>
            {fields?.map((field: any, index: number) => (
              <CommandItem
                key={field.id}
                disabled={isReturned}
                className="mb-1 border first:mt-2"
              >
                <div className="flex flex-col w-full space-y-1">
                  <div className="text-base">{field.products[0].title}</div>
                  <div className="flex flex-row items-center justify-between space-x-1">
                    <Badge className="text-xs">
                      QTY: {field.issueQuantity}
                    </Badge>
                    <Input
                      disabled={isReturned}
                      // @ts-expect-error
                      {...form.register(`items.${index}.return_quantity`)}
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
            <FormItem className="flex flex-col">
              <FormLabel>Extra Discount Amount</FormLabel>
              <FormControl>
                <Input
                  disabled={isReturned}
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

        {isReturned ? (
          <CancelBill />
        ) : (
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className={`w-full ${
              form.formState.isSubmitting && "cursor-not-allowed"
            }`}
          >
            {form.formState.isSubmitting ? "..." : "Save"}
          </Button>
        )}
      </form>
    </Form>
  );
});
BillingProducts.displayName = "BillingProducts";
export default BillingProducts;
