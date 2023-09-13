"use client";
import { memo, useTransition } from "react";
import { createUserAddress } from "@/_actions";
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

type TAddress = {
  id: string;
  label: string | null;
  streetAddress1: string | null;
  streetAddress2: string | null;
  apartment: string | null;
  city: string | null;
  province: string | null;
  postalCode: number | null;
  phone: number | null;
  userId: string | null;
};

const CreateUserAddressForm: React.FC<{
  address: TAddress | null;
}> = memo(({ address }) => {
  const form = useForm({
    defaultValues: {
      id: address?.id?.toString(),
      label: address?.label?.toString(),
      streetAddress1: address?.streetAddress1?.toString(),
      streetAddress2: address?.streetAddress2?.toString(),
      apartment: address?.apartment?.toString(),
      city: address?.city?.toString(),
      province: address?.province?.toString(),
      postalCode: address?.postalCode?.valueOf(),
      phone: address?.phone?.valueOf(),
    },
  });
  const [isPending, startTransition] = useTransition();

  // Server Action
  const onSubmit = (values: any) => {
    startTransition(() => {
      return createUserAddress(values);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => <Input type="hidden" {...field} />}
        />
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name / Label</FormLabel>
              <FormControl>
                <Input placeholder="Label Ex: Home, Office" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="streetAddress1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address 1</FormLabel>
              <FormControl>
                <Input placeholder="Street Address 1" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="streetAddress2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address 1</FormLabel>
              <FormControl>
                <Input placeholder="Street Address 1" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="apartment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apartment</FormLabel>
              <FormControl>
                <Input placeholder="Apartment" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="province"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Province</FormLabel>
              <FormControl>
                <Input placeholder="Province" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input placeholder="Postal Code" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Phone Number" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="outline" className="w-full">
          {isPending ? <Spin /> : `Save`}
        </Button>
      </form>
    </Form>
  );
});
CreateUserAddressForm.displayName = "CreateUserAddressForm";
export default CreateUserAddressForm;
