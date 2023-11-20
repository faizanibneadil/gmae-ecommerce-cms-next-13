"use client";

import { Search } from "lucide-react";
import Spin from "@/app/_components/loading-spinner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";

const SearchVariants: React.FC<{}> = () => {
  const pathname = usePathname();
  const router = useRouter();
  const form = useForm({ defaultValues: { query: "" } });

  const onSubmit = (values: any) =>
    router.push(`${pathname}?query=${values.query}`);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-1">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Title</FormLabel> */}
              <FormControl>
                <Input placeholder="Search Product" {...field} />
              </FormControl>
              {/* <FormDescription></FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          size="icon"
          disabled={form.formState.isSubmitting}
          variant="outline"
          type="submit"
        >
          {form.formState.isSubmitting ? <Spin /> : <Search />}
        </Button>
      </form>
    </Form>
  );
};
SearchVariants.displayName = "SearchVariants";
export default SearchVariants;
