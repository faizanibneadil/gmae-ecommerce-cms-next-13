"use client";

import { memo, useTransition } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { createDistribution } from "@/_actions";
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
import { createDistributionSchema } from "@/_schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PlusIcon } from "@/app/_components/icons";

const CreateDistribution: React.FC<{}> = memo(() => {
  const { data: session } = useSession();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  // form hook
  const form = useForm({
    resolver: zodResolver(createDistributionSchema),
    defaultValues: {
      name: "",
    },
  });

  // submit action
  const onSubmit = (values: any) => {
    return startTransition(async () => {
      await createDistribution({ values, session });
      return replace(`/distribution/`);
    });
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Card>
          <CardHeader>
            <PlusIcon />
          </CardHeader>
          <CardContent>Create Distribution</CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent side="top">
        <div className="max-w-3xl mx-auto">
          <SheetHeader>
            <SheetTitle>Create Distribution</SheetTitle>
            <SheetDescription>
              Create New Distribution to manage different products and different
              Companies.
            </SheetDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          placeholder="Ex: ABC Traders."
                          {...field}
                        />
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
          </SheetHeader>
        </div>
      </SheetContent>
    </Sheet>
  );
});
CreateDistribution.displayName = "CreateDistribution";
export default CreateDistribution;
