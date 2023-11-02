import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Suspense, use } from "react";
import { _getLedgerBills } from "@/queries";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  params: { distributionId: string };
}

const Page: React.FC<Props> = ({ params }) => {
  const bills = use(_getLedgerBills({ distributionId: params.distributionId }));
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ];
  return (
    <div className="space-y-1">
      <div className="grid grid-cols-1 gap-1 md:grid-cols-3">
        <Card>
          <CardHeader>Recoveries. (Pending)</CardHeader>
          <CardContent>888</CardContent>
          <CardFooter>View Bills</CardFooter>
        </Card>
        <Card>
          <CardHeader>Recoveries. (Received)</CardHeader>
          <CardContent>888</CardContent>
          <CardFooter>View Bills</CardFooter>
        </Card>
        <Card>
          <CardHeader>Recoveries. (Up Coming)</CardHeader>
          <CardContent>888</CardContent>
          <CardFooter>View Bills</CardFooter>
        </Card>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ScrollArea className="w-full h-auto p-2 pb-4 mt-2 mb-2">
          <ScrollBar orientation="horizontal" />
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">
                    {invoice.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </Suspense>
    </div>
  );
};

export default Page;
