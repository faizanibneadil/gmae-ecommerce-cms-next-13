"use client";

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
import { createAttributesSchema } from "@/_schemas";
import { useParams } from "next/navigation";
import { $updateAttributesOfProduct } from "@/mutations";

const CreateAttributeForm: React.FC<{}> = () => {
  const form = useForm({
    resolver: zodResolver(createAttributesSchema),
    defaultValues: {
      productId: useParams()?.inventoryId as string,
      name: "",
      value: "",
    },
  });

  // Server Action
  const onSubmit = (values: any) => $updateAttributesOfProduct(values);

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
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          variant="outline"
          className="w-full"
        >
          {form.formState.isSubmitting ? <Spin /> : `Add Attribute.`}
        </Button>
      </form>
    </Form>
  );
};
export default CreateAttributeForm;
