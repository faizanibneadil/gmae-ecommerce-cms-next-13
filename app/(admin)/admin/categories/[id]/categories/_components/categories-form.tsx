"use client";

import { useForm } from "react-hook-form";
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
import { memo, useTransition } from "react";
import { useParams } from "next/navigation";
import { connectCategories, connectSubCategories } from "@/_actions";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Eye, Globe, Layout } from "lucide-react";
import Spin from "@/app/_components/loading-spinner";

type TCategories = {
  id: string;
  name: string | null;
  displayOnLandingPage: boolean | null;
  isPublished: boolean | null;
  images: {
    src: string | null;
  } | null;
  subCategories: {
    id: string;
  }[];
};

const CategoriesForm: React.FC<{
  categories: TCategories[];
}> = memo(({ categories }) => {
  const categoryId = useParams()?.id as string;
  const [pending, startTransition] = useTransition();
  const form = useForm({
    defaultValues: {
      categories: categories
        .filter((c) => c.subCategories?.length != 0)
        .map((o) => o.subCategories.map((e) => e.id))
        .flat(),
    },
  });

  const onSubmit = (data: any) => {
    return startTransition(() => {
      return connectSubCategories({
        categoriesIds: data.categories,
        categoryId,
      });
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
              <div className="grid grid-cols-1 gap-1.5 md:grid-cols-2">
                {categories.map((c) => (
                  <FormField
                    key={c.id}
                    control={form.control}
                    name="categories"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={c.id}
                          className="flex flex-row items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center space-x-2">
                            <Avatar>
                              <AvatarImage
                                src={`https://lh3.googleusercontent.com/d/${c?.images?.src}=s220`}
                              />
                              <AvatarFallback>
                                {c.name?.slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>

                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                {c.name}
                              </FormLabel>
                              <FormDescription>
                                <div className="flex flex-row items-center space-x-2">
                                  {/* {c?.parentCategory && (
                                    <Badge>{c?.parentCategory?.name}</Badge>
                                  )} */}
                                  {c?.displayOnLandingPage && (
                                    <Layout className="w-4 h-4" />
                                  )}
                                  {c?.isPublished ? (
                                    <Globe className="w-4 h-4" />
                                  ) : (
                                    <Eye className="w-4 h-4" />
                                  )}
                                </div>
                              </FormDescription>
                            </div>
                          </div>
                          <FormControl>
                            <Switch
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
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          variant="outline"
          disabled={pending}
          type="submit"
          className="w-full"
        >
          {pending ? <Spin className="w-4 h-4" /> : `Save`}
        </Button>
      </form>
    </Form>
  );
});
CategoriesForm.displayName = "CategoriesForm";
export default CategoriesForm;
