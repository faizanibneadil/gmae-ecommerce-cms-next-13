"use client";

import { useForm } from "react-hook-form";
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
import { memo, useTransition } from "react";
import { useParams } from "next/navigation";
import {
  connectCategories,
  connectShopsWithArea,
  connectSubCategories,
} from "@/_actions";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Eye, Globe, Layout } from "lucide-react";
import Spin from "@/app/_components/loading-spinner";

type TShops = {
  Areas: {
    id: string;
  } | null;
  id: string;
  name: string | null;
};

const ShopsForm: React.FC<{
  shops: TShops[];
}> = memo(({ shops }) => {
  const areaId = useParams()?.id as string;
  const [pending, startTransition] = useTransition();
  const form = useForm({
    defaultValues: {
      shops: shops
        .filter((shop) => shop.Areas?.id === areaId)
        .map((shop) => shop.id),
    },
  });

  const onSubmit = (data: any) => {
    return startTransition(() => {
      return connectShopsWithArea({
        shopIds: data.shops,
        areaId,
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="shops"
          render={() => (
            <FormItem>
              <div className="grid grid-cols-1 gap-1.5 md:grid-cols-2">
                {shops.map((shop) => (
                  <FormField
                    key={shop.id}
                    control={form.control}
                    name="shops"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={shop.id}
                          className="flex flex-row items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center space-x-2">
                            <Avatar>
                              <AvatarImage
                                src={`https://lh3.googleusercontent.com/d/${shop.id}=s220`}
                              />
                              <AvatarFallback>
                                {shop.name?.slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>

                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                {shop.name}
                              </FormLabel>
                              <FormDescription></FormDescription>
                            </div>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value?.includes(shop?.id as never)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, shop.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== shop.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          variant="outline"
          disabled={pending}
          type="submit"
          className="w-full"
        >
          {pending ? <Spin className="w-4 h-4" /> : `Save`}
        </Button>
      </form>
    </Form>
  );
});
ShopsForm.displayName = "ShopsForm";
export default ShopsForm;
