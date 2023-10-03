"use client";

import { memo, useTransition } from "react";
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
import { createAttributesSchema } from "@/_schemas";
import { useParams } from "next/navigation";
import { createAttributesAction } from "@/_actions";

const CreateAttributeForm: React.FC<{}> = memo(() => {
  const productId = useParams()?.id as string;
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(createAttributesSchema),
    defaultValues: {
      productId: productId,
      name: "",
      value: "",
    },
  });

  // Server Action
  const onSubmit = (values: any) => {
    startTransition(() => {
      return createAttributesAction(values);
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-1 md:grid-cols-3"
      >
        <FormField
          control={form.control}
          name="productId"
          render={({ field }) => <Input type="hidden" {...field} />}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-0">
              {/* <FormLabel>Name</FormLabel> */}
              <FormControl>
                <Input placeholder="Ex: Color" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem className="space-y-0">
              {/* <FormLabel>Value</FormLabel> */}
              <FormControl>
                <Input placeholder="Green" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="outline" className="w-full">
          {isPending ? <Spin /> : `Add Attribute.`}
        </Button>
      </form>
    </Form>
  );
});
CreateAttributeForm.displayName = "CreateAttributeForm";
export default CreateAttributeForm;
