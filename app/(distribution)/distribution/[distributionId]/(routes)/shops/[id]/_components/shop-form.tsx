"use client";
import { memo, useTransition } from "react";
import { createShop } from "@/_actions";
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
import Spin from "@/app/_components/loading-spinner";
import { Button } from "@/components/ui/button";
import { $Enums } from "@prisma/client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { createShopSchema } from "@/_schemas";
import { useParams, useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TShop = {
  id: string;
  accessId: number | null;
  name: string | null;
  owner: string | null;
  phone: string | null;
  address: string | null;
  popType: $Enums.PopType | null;
  payType: $Enums.ShopPaymentType | null;
};

const CreateShopForm: React.FC<{
  shop: {
    Areas: {
      id: string;
    } | null;
    id: string;
    name: string | null;
    owner: string | null;
    phone: string | null;
    address: string | null;
    popType: $Enums.PopType | null;
    payType: $Enums.ShopPaymentType | null;
  } | null;
  areas: {
    shops: {
      id: string;
    }[];
    id: string;
    name: string | null;
  }[];
}> = memo(({ shop, areas }) => {
  const distributionId = useParams()?.distributionId as string;
  const { replace } = useRouter();
  const form = useForm({
    resolver: zodResolver(createShopSchema),
    defaultValues: {
      id: shop?.id?.toString() ?? uuidv4(),
      name: shop?.name?.toString(),
      owner: shop?.owner?.toString(),
      phone: shop?.phone?.toString(),
      address: shop?.address?.toString(),
      popType: shop?.popType?.toString(),
      payType: shop?.payType?.toString(),
      areaId: shop?.Areas?.id.toString(),
    },
  });
  const [isPending, startTransition] = useTransition();

  // Server Action
  const onSubmit = (values: any) => {
    startTransition(async () => {
      await createShop(values);
      return replace(`/distribution/${distributionId}/shops`);
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Brand Name" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="owner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Owner Name</FormLabel>
              <FormControl>
                <Input placeholder="Owner Name" {...field} />
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
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Phone number" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shop Address</FormLabel>
              <FormControl>
                <Input placeholder="Shop Address" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="areaId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Areas.</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Shop Area." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {areas.map((area) => (
                    <SelectItem key={area.id} value={area.id}>
                      {area.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="popType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PopType</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="RETAILER" />
                    </FormControl>
                    <FormLabel className="font-normal">RETAILER</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="WHOLESALER" />
                    </FormControl>
                    <FormLabel className="font-normal">WHOLESALER</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="payType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PayType</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="CASH" />
                    </FormControl>
                    <FormLabel className="font-normal">CASH</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="CHEQUE" />
                    </FormControl>
                    <FormLabel className="font-normal">CHEQUE</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="BILL" />
                    </FormControl>
                    <FormLabel className="font-normal">BILL</FormLabel>
                  </FormItem>
                </RadioGroup>
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
CreateShopForm.displayName = "CreateShopForm";
export default CreateShopForm;
