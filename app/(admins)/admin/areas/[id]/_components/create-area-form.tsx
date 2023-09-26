"use client";

import { createArea, createCompany } from "@/_actions";
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
import { createAreaSchema } from "@/_schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

type TAreas = {
  id: string;
  name: string | null;
};

const CreateAreaForm: React.FC<{
  areas: TAreas | null;
}> = memo(({ areas }) => {
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  // form hook
  const form = useForm({
    resolver: zodResolver(createAreaSchema),
    defaultValues: {
      id: areas?.id?.toString() ?? uuidv4(),
      name: areas?.name?.toString(),
    },
  });

  // submit action
  const onSubmit = (values: any) => {
    return startTransition(async () => {
      await createArea(values);
      return replace("/admin/areas");
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
CreateAreaForm.displayName = "CreateAreaForm";
export default CreateAreaForm;
