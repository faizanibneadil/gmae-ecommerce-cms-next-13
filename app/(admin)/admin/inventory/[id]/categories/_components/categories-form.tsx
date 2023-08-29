"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { memo, useTransition } from "react";
import { useParams } from "next/navigation";
import { connectCategories } from "@/_actions";

type TCategories = {
  id: string;
  name: string | null;
  Products: {
    id: string;
  }[];
  parentCategory: {
    name: string | null;
  } | null;
};

const CategoriesForm: React.FC<{
  categories: TCategories[];
}> = memo(({ categories }) => {
  console.log(
    categories.filter((c) => c.Products.length != 0).map((c) => c.id)
  );
  const productId = useParams()?.id as string;
  const [pending, startTransition] = useTransition();
  const form = useForm({
    defaultValues: {
      categories: categories
        .filter((c) => c.Products.length != 0)
        .map((c) => c.id),
    },
  });

  const onSubmit = (data: any) => {
    return startTransition(() => {
      return connectCategories({ categoriesIds: data.categories, productId });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="categories"
          render={() => (
            <FormItem>
              {categories.map((c) => (
                <FormField
                  key={c.id}
                  control={form.control}
                  name="categories"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={c.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(c?.id as never)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, c.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== c.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{c.name}</FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="outline" disabled={pending} type="submit">
          {pending ? `Saving...` : `Submit`}
        </Button>
      </form>
    </Form>
  );
});
CategoriesForm.displayName = "CategoriesForm";
export default CategoriesForm;
