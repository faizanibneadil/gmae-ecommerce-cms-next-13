"use client";
import { memo, useTransition } from "react";
import { v4 as uuidV4 } from "uuid";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Spin from "@/app/_components/loading-spinner";
import { Button } from "@/components/ui/button";
import { $Enums } from "@prisma/client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { updateUser } from "@/_actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "@/_schemas";
import { useRouter } from "next/navigation";

const UserProfileForm: React.FC<{
  user: {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    role: $Enums.Role | null;
    cnic: string | null;
    phone: string | null;
  } | null;
}> = memo(({ user }) => {
  const { replace } = useRouter();
  const form = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      id: user?.id.toString() ?? uuidV4(),
      name: user?.name?.toString(),
      email: user?.email?.toString(),
      role: user?.role?.toString(),
      cnic: user?.cnic?.toString(),
      phone: user?.phone?.toString(),
    },
  });
  const [isPending, startTransition] = useTransition();

  // Server Action
  const onSubmit = (values: any) => {
    startTransition(async () => {
      await updateUser(values);
      return replace("/admin/users");
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <Input type="hidden" placeholder="Product Title" {...field} />
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Name</FormLabel>
              <FormControl>
                <Input placeholder="User Name" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Email</FormLabel>
              <FormControl>
                <Input placeholder="User Email" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cnic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User CNIC</FormLabel>
              <FormControl>
                <Input placeholder="User CNIC" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="User Phone Number" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Role</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="CUSTOMER" />
                    </FormControl>
                    <FormLabel className="font-normal">CUSTOMER</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="SALES_MAN" />
                    </FormControl>
                    <FormLabel className="font-normal">SALE MANE</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="BOOKER" />
                    </FormControl>
                    <FormLabel className="font-normal">BOOKER</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="INVENTORY_STAFF" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      INVENTORY STAFF
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="ADMIN" />
                    </FormControl>
                    <FormLabel className="font-normal">ADMIN</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="BILLING" />
                    </FormControl>
                    <FormLabel className="font-normal">BILLING</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="INSIGHTS" />
                    </FormControl>
                    <FormLabel className="font-normal">INSIGHTS</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="SHOP_OWNER" />
                    </FormControl>
                    <FormLabel className="font-normal">SHOP OWNER</FormLabel>
                  </FormItem>
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
UserProfileForm.displayName = "UserProfileForm";
export default UserProfileForm;
