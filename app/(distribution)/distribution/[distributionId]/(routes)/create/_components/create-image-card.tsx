"use client";

import { initialImageCreateSchema } from "@/_schemas";
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
import { $initialImageCreateAction } from "@/mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateImageCard: React.FC<{}> = () => {
  const router = useRouter();
  const distributionId = useParams()?.distributionId as string;
  const form = useForm({
    resolver: zodResolver(initialImageCreateSchema),
    defaultValues: {
      src: "",
      searchText: "",
      altText: "",
    },
  });

  const onSubmit = (values: any) => {
    toast.promise($initialImageCreateAction(values), {
      success: (id) => {
        router.replace(`/distribution/${distributionId}/images`);
        return "success";
      },
      error: (msg) => `${msg}`,
      loading: "Creating ...",
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="flex flex-col items-center justify-center h-40 space-y-2 border rounded-md cursor-pointer hover:bg-secondary">
        <ImagePlus className="w-10 h-10 text-muted-foreground" />
        <span>Add Images</span>
      </DialogTrigger>
      <DialogContent className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="src"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Id / Source</FormLabel>
                  <FormControl>
                    <Input placeholder="Image Id" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Provide imag id that you uploaded on google drive.
                  </FormDescription>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="searchText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Search Text</FormLabel>
                  <FormControl>
                    <Input placeholder="Search Text" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Provide Search Text that how to wont to search this image.
                    Search Text looks like this: Ex: Printer, Mobile phons bla
                    bla.
                  </FormDescription>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="altText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alter Text</FormLabel>
                  <FormControl>
                    <Input placeholder="Alt Text" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Provide Alternative text in case image is not rendered so
                    alternative text will be display on the screen this best
                    text for SEO.
                  </FormDescription>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              variant="outline"
              className="w-full"
            >
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateImageCard;
