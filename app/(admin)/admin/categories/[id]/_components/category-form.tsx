"use client";
import { createCategoryAction } from "@/_actions";
import { Button } from "@/components/ui/button";
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
import { memo, useTransition } from "react";
import { useForm } from "react-hook-form";
import Spin from "@/app/_components/loading-spinner";
import { Switch } from "@/components/ui/switch";

type TCategories = {
  id: string;
  name: string | null;
  slug: string | null;
  order: number | null;
  displayOnLandingPage: boolean | null;
  isPublished: boolean | null;
} | null;

const CategoryForm: React.FC<{
  categories: TCategories;
}> = memo(({ categories }) => {
  const form = useForm({
    defaultValues: {
      id: categories?.id?.toString(),
      name: categories?.name?.toString(),
      slug: categories?.slug?.toString(),
      order: categories?.order?.toString(),
      isPublished: categories?.isPublished?.valueOf(),
      displayOnLandingPage: categories?.displayOnLandingPage?.valueOf(),
    },
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: any) => {
    return startTransition(() => {
      return createCategoryAction(values);
    });
  };

  // component
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
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Category Name" {...field} />
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
                <Input placeholder="Category Slug" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order</FormLabel>
              <FormControl>
                <Input placeholder="Category Order" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPublished"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Publish</FormLabel>
                <FormDescription>
                  Make this Category visible on website
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
          name="displayOnLandingPage"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Featured</FormLabel>
                <FormDescription>
                  Make this Category Featured for display on landing page
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
CategoryForm.displayName = "CategoryForm";
export default CategoryForm;
