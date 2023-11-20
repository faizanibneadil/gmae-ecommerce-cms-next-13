import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PencilIcon } from "@/app/_components/icons";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { PageProps } from "@/types";
import { _getTransactions, _searchTransactions } from "@/queries";
import { Eye } from "lucide-react";

const Page: React.FC<PageProps> = async ({ params, searchParams }) => {
  const transactions = searchParams?.query
    ? await _searchTransactions({
        did: params.did,
        query: searchParams?.query,
      })
    : await _getTransactions(params.did);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10">#</TableHead>
          <TableHead className="w-40">Items</TableHead>
          <TableHead className="w-40">Area</TableHead>
          <TableHead className="w-40">Booking By</TableHead>
          <TableHead className="w-40">Deliver By</TableHead>
          <TableHead className="w-40">Shop</TableHead>
          <TableHead className="w-40">Company</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="w-10 py-1 font-medium text-center">
              {transaction.accessId}
            </TableCell>
            <TableCell className="w-40 py-1 text-left">
              {transaction._count.items} items
            </TableCell>
            <TableCell className="w-40 py-1 text-left">
              {transaction.area?.name}
            </TableCell>
            <TableCell className="w-40 py-1 text-left">
              {transaction.booker?.name}
            </TableCell>
            <TableCell className="w-40 py-1 text-left">
              {transaction.saleMane?.name}
            </TableCell>
            <TableCell className="w-40 py-1 text-left">
              {transaction.shop?.name}
            </TableCell>
            <TableCell className="w-40 py-1 text-left">
              {transaction.company?.name}
            </TableCell>
            <TableCell className="flex items-center py-1 space-x-1">
              <Link
                href={`/d/${params.did}/return/${transaction.id}`}
                className={buttonVariants({
                  variant: "secondary",
                  size: "sm",
                  className: "flex w-full",
                })}
              >
                <PencilIcon className="w-4 h-4 mr-2" /> Edit
              </Link>
              <Link
                href={`/d/${params.did}/transactions/${transaction.id}`}
                className={buttonVariants({
                  variant: "secondary",
                  size: "sm",
                  className: "flex w-full",
                })}
              >
                <Eye className="w-4 h-4 mr-2" /> Preview
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Page;
