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
import { updateProductCompany, updateShopArea } from "@/_actions";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type TAreas = {
  shops: {
    id: string;
  }[];
  id: string;
  name: string | null;
  _count: {
    shops: number;
  };
};

const AreasForm: React.FC<{
  areas: TAreas[];
}> = memo(({ areas }) => {
  const shopId = useParams()?.id as string;
  const form = useForm({
    defaultValues: {
      id: areas.find((c) => c.shops.length > 0)?.id,
      shopId: shopId,
    },
  });
  const [isPending, startTransition] = useTransition();

  // Server Action
  const onSubmit = (values: any) => {
    startTransition(() => {
      return updateShopArea(values);
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
                  {areas.map((area) => (
                    <Label
                      key={area.id}
                      htmlFor={area.id}
                      className="flex flex-col space-y-4"
                    >
                      <Card className="flex flex-row items-center justify-between px-2 py-2">
                        <div className="flex flex-row items-center space-x-2">
                          <RadioGroupItem value={area.id} id={area.id} />
                          <div className="flex flex-col">
                            <p>{area.name}</p>
                          </div>
                        </div>
                        <Badge>{area._count.shops} Shops.</Badge>
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
AreasForm.displayName = "AreasForm";
export default AreasForm;
