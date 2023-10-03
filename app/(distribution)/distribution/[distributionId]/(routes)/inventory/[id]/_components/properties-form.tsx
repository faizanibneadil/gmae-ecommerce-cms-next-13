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
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductSchema } from "@/_schemas";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InfoIcon } from "@/app/_components/icons";
import { v4 as uuidv4 } from "uuid";
import { useParams, useRouter } from "next/navigation";

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
  isPublished: boolean | null;
  isFeatured: boolean | null;
  isReviewEnable: boolean | null;
  isTrackStock: boolean | null;
} | null;

const CreateInventoryForm: React.FC<{
  properties: TProperties;
}> = memo(({ properties }) => {
  const distributionId = useParams()?.distributionId as string;
  const { replace } = useRouter();
  const form = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      id: properties?.id?.toString() ?? uuidv4(),
      title: properties?.title?.toString(),
      slug: properties?.slug?.toString(),
      description: properties?.description?.toString(),
      regularPrice: properties?.regularPrice?.toFixed(),
      salePrice: properties?.salePrice?.toFixed(),
      purchasePrice: properties?.purchasePrice?.toFixed(),
      purchaseLimit: properties?.purchaseLimit?.toFixed(),
      stock: properties?.stock?.toFixed(),
      isPublished: properties?.isPublished?.valueOf(),
      isFeatured: properties?.isFeatured?.valueOf(),
      isReviewEnable: properties?.isReviewEnable?.valueOf(),
      isTrackStock: properties?.isTrackStock?.valueOf(),
    },
  });
  const [isPending, startTransition] = useTransition();

  // Server Action
  const onSubmit = (values: any) => {
    startTransition(async () => {
      await createProductAction(values);
      return replace(`/distribution/${distributionId}/inventory`);
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
                <FormLabel className="flex items-center justify-between">
                  <span>Regular Price</span>
                  <Popover>
                    <PopoverTrigger>
                      <InfoIcon className="w-4 h-4" />
                    </PopoverTrigger>
                    <PopoverContent side="top" className="p-2 text-xs">
                      The price at which this item is normally sold in the
                      market.
                    </PopoverContent>
                  </Popover>
                </FormLabel>
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
                <FormLabel className="flex items-center justify-between">
                  <span>Sale / Discounted Price</span>
                  <Popover>
                    <PopoverTrigger>
                      <InfoIcon className="w-4 h-4" />
                    </PopoverTrigger>
                    <PopoverContent side="top" className="p-2 text-xs">
                      The price that is lower than the market price.
                    </PopoverContent>
                  </Popover>
                </FormLabel>
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
                <FormLabel className="flex items-center justify-between">
                  <span>Purchase / Cost Price</span>
                  <Popover>
                    <PopoverTrigger>
                      <InfoIcon className="w-4 h-4" />
                    </PopoverTrigger>
                    <PopoverContent side="top" className="p-2 text-xs">
                      The price at which you have purchased this item.
                    </PopoverContent>
                  </Popover>
                </FormLabel>
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
                <FormLabel className="flex items-center justify-between">
                  <span>Purchase Limit.</span>
                  <Popover>
                    <PopoverTrigger>
                      <InfoIcon className="w-4 h-4" />
                    </PopoverTrigger>
                    <PopoverContent side="top" className="p-2 text-xs">
                      How many quantities of this product can the customer
                      purchase at most?
                    </PopoverContent>
                  </Popover>
                </FormLabel>
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
                <FormLabel className="flex items-center justify-between">
                  <span>Stock.</span>
                  <Popover>
                    <PopoverTrigger>
                      <InfoIcon className="w-4 h-4" />
                    </PopoverTrigger>
                    <PopoverContent side="top" className="p-2 text-xs">
                      How much is the stock quantity of this product in the
                      warehouse?
                    </PopoverContent>
                  </Popover>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Stock" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="isPublished"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Publish</FormLabel>
                <FormDescription>
                  Publish this product and display it on your website.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isFeatured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Featured</FormLabel>
                <FormDescription>
                  Make this product a featured product so that it is displayed
                  on the first page of the website.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isReviewEnable"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Enable Reviews</FormLabel>
                <FormDescription>
                  Enable reviews for this product so that customers can see each
                  others reviews
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isTrackStock"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Enable Tracking Stock
                </FormLabel>
                <FormDescription>
                  Whenever an order is completed, the stock of this product
                  should be deducted by the products stock quantity.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
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
CreateInventoryForm.displayName = "CreateInventoryForm";
export default CreateInventoryForm;
