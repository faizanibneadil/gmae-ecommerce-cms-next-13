"use client";

import { PlusIcon } from "@/app/_components/icons";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { $createDistributionAction } from "@/mutations";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Distribution Name must be at least 2 characters.",
  }),
});
const CreateDistributionForm: React.FC<{}> = memo(({}) => {
  const { push } = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const id = await $createDistributionAction({ ...values });
    return push(`/d/${id}`);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input placeholder="Distribution Name." {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="outline" className="w-full">
            <PlusIcon className="w-5 h-5 mr-2" /> Create
          </Button>
        </form>
      </Form>
    </div>
  );
});
CreateDistributionForm.displayName = "CreateDistributionForm";
export default CreateDistributionForm;
