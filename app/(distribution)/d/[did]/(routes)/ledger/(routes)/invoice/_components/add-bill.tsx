"use client";
import { memo, useTransition } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { connectBillToLedgerSchema } from "@/_schemas";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { $addBillToLedger } from "@/mutations";
import { toast } from "sonner";

const ConnectBillToLedger: React.FC<{}> = memo(() => {
  const did = useParams()?.did as string;
  const form = useForm({
    resolver: zodResolver(connectBillToLedgerSchema),
    defaultValues: {
      billId: "",
      did: did,
    },
  });
  const [isPending, startTransition] = useTransition();

  // Server Action
  const onSubmit = (values: any) => {
    startTransition(async () => {
      toast.promise($addBillToLedger(values), {
        error: (msg) => `${msg}`,
        loading: "Please Wait ...",
        success: () => {
          form.setValue("billId", "");
          return "Added to ledger.";
        },
      });
    });
  };

  return (
    <Card>
      <CardHeader>Add Bill to Ledger</CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center space-x-1"
          >
            <FormField
              control={form.control}
              name="did"
              render={({ field }) => <Input type="hidden" {...field} />}
            />
            <FormField
              control={form.control}
              name="billId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel></FormLabel>
                  <FormControl>
                    <Input placeholder="Bill Id" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="outline">
              {isPending ? <Spin /> : `Add`}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
});
ConnectBillToLedger.displayName = "ConnectBillToLedger";
export default ConnectBillToLedger;
