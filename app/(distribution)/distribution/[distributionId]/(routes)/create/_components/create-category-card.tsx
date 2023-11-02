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
import { $initialCategoryCreateAction } from "@/mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { ListChecks } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string().nonempty("Name can not empty"),
});

const CreateCategoryCard: React.FC<{}> = () => {
  const distributionId = useParams()?.distributionId as string;
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: any) => {
    toast.promise($initialCategoryCreateAction(values), {
      success: () => {
        router.replace(`/distribution/${distributionId}/categories`);
        return "success";
      },
      error: (msg) => `${msg}`,
      loading: "Creating ...",
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="flex flex-col items-center justify-center h-40 space-y-2 border rounded-md cursor-pointer hover:bg-secondary">
        <ListChecks className="w-10 h-10 text-muted-foreground" />
        <span>Create Categories</span>
      </DialogTrigger>
      <DialogContent className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <DialogHeader>
              <DialogTitle>Create Category</DialogTitle>
              <DialogDescription>
                Initially new Category need name.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Category Name" {...field} />
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

export default CreateCategoryCard;
