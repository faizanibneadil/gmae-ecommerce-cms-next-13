"use client";

import { createImageAction } from "@/_actions";
import { Images } from "@prisma/client";
import { memo, useTransition } from "react";
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
import { v4 as uuidv4 } from "uuid";
import { useParams, useRouter } from "next/navigation";

const CreateImageForm: React.FC<{
  image: Images | null;
}> = memo(({ image }) => {
  const did = useParams()?.did as string;
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  // form hook
  const form = useForm({
    defaultValues: {
      id: image?.id?.toString() ?? uuidv4(),
      src: image?.src?.toString(),
      searchText: image?.searchText?.toString(),
      altText: image?.altText?.toString(),
    },
  });

  // submit action
  const onSubmit = (values: any) => {
    return startTransition(() => {
      createImageAction(values);
      return replace(`/d/${did}/images`);
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => <Input type="hidden" {...field} />}
        />
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
              <FormMessage />
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
                Search Text looks like this: Ex: Printer, Mobile phons bla bla.
              </FormDescription>
              <FormMessage />
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
                alternative text will be display on the screen this best text
                for SEO.
              </FormDescription>
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
CreateImageForm.displayName = "CreateImageForm";
export default CreateImageForm;
