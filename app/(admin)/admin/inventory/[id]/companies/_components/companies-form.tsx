"use client";

import { memo, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Spin from "@/app/_components/loading-spinner";
import { useParams } from "next/navigation";
import { updateProductCompany } from "@/_actions";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type TCompanies = {
  products: {
    id: string;
  }[];
  id: string;
  name: string | null;
  _count: {
    products: number;
  };
};

const CompaniesForm: React.FC<{
  companies: TCompanies[];
}> = memo(({ companies }) => {
  const productId = useParams()?.id as string;
  const form = useForm({
    defaultValues: {
      id: companies.find((c) => c.products.length > 0)?.id,
      productId: productId,
    },
  });
  const [isPending, startTransition] = useTransition();

  // Server Action
  const onSubmit = (values: any) => {
    startTransition(() => {
      return updateProductCompany(values);
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel></FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-"
                >
                  {companies.map((company) => (
                    <Label
                      key={company.id}
                      htmlFor={company.id}
                      className="flex flex-col space-y-4"
                    >
                      <Card className="flex flex-row items-center justify-between px-2 py-2">
                        <div className="flex flex-row items-center space-x-2">
                          <RadioGroupItem value={company.id} id={company.id} />
                          <div className="flex flex-col">
                            <p>{company.name}</p>
                          </div>
                        </div>
                        <Badge>{company._count.products} Items.</Badge>
                      </Card>
                    </Label>
                  ))}
                </RadioGroup>
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
CompaniesForm.displayName = "CompaniesForm";
export default CompaniesForm;
