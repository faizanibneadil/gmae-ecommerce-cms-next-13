"use client";
import { memo, useTransition } from "react";
import { createBrand } from "@/_actions";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { createBrandSchema } from "@/_schemas";

type TProperties = {
  id: string;
  name: string | null;
};

const CreateBrandsForm: React.FC<{
  brand: TProperties | null;
}> = memo(({ brand }) => {
  const form = useForm({
    resolver: zodResolver(createBrandSchema),
    defaultValues: {
      id: brand?.id?.toString(),
      name: brand?.name?.toString(),
    },
  });
  const [isPending, startTransition] = useTransition();

  // Server Action
  const onSubmit = (values: any) => {
    startTransition(() => {
      return createBrand(values);
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
        <Button type="submit" variant="outline" className="w-full">
          {isPending ? <Spin /> : `Save`}
        </Button>
      </form>
    </Form>
  );
});
CreateBrandsForm.displayName = "CreateBrandsForm";
export default CreateBrandsForm;
