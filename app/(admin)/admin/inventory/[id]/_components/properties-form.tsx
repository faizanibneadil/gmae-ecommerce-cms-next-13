"use client";
import { memo, useTransition } from "react";
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

type TProperties = {
  id: string;
  title: string | null;
  slug: string | null;
  description: string | null;
  regularPrice: number | null;
  salePrice: number | null;
  purchasePrice: number | null;
  purchaseLimit: number | null;
  stock: number | null;
} | null;

const CreateInventoryForm: React.FC<{
  properties: TProperties;
}> = memo(({ properties }) => {
  const form = useForm({
    defaultValues: {
      id: properties?.id?.toString(),
      title: properties?.title?.toString(),
      slug: properties?.slug?.toString(),
      description: properties?.description?.toString(),
      regularPrice: properties?.regularPrice?.toFixed(),
      salePrice: properties?.salePrice?.toFixed(),
      purchasePrice: properties?.purchasePrice?.toFixed(),
      purchaseLimit: properties?.purchaseLimit?.toFixed(),
      stock: properties?.stock?.toFixed(),
    },
  });
  const [isPending, startTransition] = useTransition();

  // Server Action
  const onSubmit = (values: any) => {
    startTransition(() => {
      return createProductAction(values);
    });
  };

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
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Product Title" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="Product Slug" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  rows={12}
                  placeholder="Write some words about this product."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid content-center grid-cols-1 gap-2 md:grid-cols-3">
          <FormField
            control={form.control}
            name="regularPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Regular Price</FormLabel>
                <FormControl>
                  <Input placeholder="Regular Price" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="salePrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sale / Discounted Price</FormLabel>
                <FormControl>
                  <Input placeholder="Sale Price" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="purchasePrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Purchase / Cost Price</FormLabel>
                <FormControl>
                  <Input placeholder="Purchase Price" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="purchaseLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Purchase Limit</FormLabel>
                <FormControl>
                  <Input placeholder="Purchase Limit" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input placeholder="Stock" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" variant="outline" className="w-full">
          {isPending ? <Spin /> : `Save`}
        </Button>
      </form>
    </Form>
  );
});
CreateInventoryForm.displayName = "CreateInventoryForm";
export default CreateInventoryForm;
