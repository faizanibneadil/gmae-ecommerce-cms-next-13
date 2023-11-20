"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { $initialInventoryCreateAction as create } from "@/mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoIcon, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  title: z.string().nonempty("title can not empty"),
  regularPrice: z.coerce
    .number()
    .nonnegative("Negative number are not allowed.")
    .min(1, "Price should be 1"),
});

const CreateInventoryCard: React.FC<{}> = () => {
  const did = useParams()?.did as string;
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      regularPrice: "",
    },
  });

  const onSubmit = (values: any) => {
    toast.promise(create({ did, ...values }), {
      success: (id) => {
        router.replace(`/d/${did}/inventory`);
        return "success";
      },
      error: (msg) => `${msg}`,
      loading: "Creating ...",
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="flex flex-col items-center justify-center h-40 space-y-2 border rounded-md cursor-pointer hover:bg-secondary">
        <Package className="w-10 h-10 text-muted-foreground" />
        <span>Create Inventory</span>
      </DialogTrigger>
      <DialogContent className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <DialogHeader>
              <DialogTitle>Create Inventory</DialogTitle>
              <DialogDescription>
                Initially new inventory need title and price.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Title" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="regularPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center justify-between">
                    <span>Regular Price</span>
                    <Popover>
                      <PopoverTrigger>
                        <InfoIcon className="w-4 h-4" />
                      </PopoverTrigger>
                      <PopoverContent side="top" className="p-2 text-xs">
                        The price at which this item is normally sold in the
                        market.
                      </PopoverContent>
                    </Popover>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Regular Price" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateInventoryCard;
