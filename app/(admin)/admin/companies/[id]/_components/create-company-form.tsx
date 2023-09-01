"use client";

import { createCompany } from "@/_actions";
import { memo, useTransition } from "react";
import { useForm } from "react-hook-form";
import Spin from "@/app/_components/loading-spinner";
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
import { Button } from "@/components/ui/button";
import { createCategorySchema } from "@/_schemas";

type TCompany = {
  id: string;
  name: string | null;
};

const CreateCompanyForm: React.FC<{
  company: TCompany | null;
}> = memo(({ company }) => {
  const [isPending, startTransition] = useTransition();

  // form hook
  const form = useForm({
    defaultValues: {
      id: company?.id?.toString(),
      name: company?.name?.toString(),
    },
  });

  // submit action
  const onSubmit = (values: any) => {
    return startTransition(() => {
      return createCompany(values);
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
                <Input placeholder="Ex: Nestle, Samsung" {...field} />
              </FormControl>
              <FormDescription className="text-xs"></FormDescription>
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
CreateCompanyForm.displayName = "CreateCompanyForm";
export default CreateCompanyForm;
