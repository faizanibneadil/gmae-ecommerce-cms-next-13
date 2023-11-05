"use client";

import { createBrand } from "@/_actions";
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
import { createBrandSchema } from "@/_schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { useParams, useRouter } from "next/navigation";

type TBrand = {
  id: string;
  name: string | null;
};

const CreateBrandForm: React.FC<{
  brand: TBrand | null;
}> = memo(({ brand }) => {
  const distributionId = useParams()?.distributionId as string;
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  // form hook
  const form = useForm({
    resolver: zodResolver(createBrandSchema),
    defaultValues: {
      id: brand?.id?.toString() ?? uuidv4(),
      name: brand?.name?.toString(),
      distributionId: distributionId,
    },
  });

  // submit action
  const onSubmit = (values: any) => {
    return startTransition(async () => {
      await createBrand(values);
      return replace(`/distribution/${distributionId}/brands`);
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
          name="distributionId"
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
CreateBrandForm.displayName = "CreateBrandForm";
export default CreateBrandForm;
