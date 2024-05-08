"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { priceFormatter } from "@/lib/utils";

import { forwardRef } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  transaction: {
    id: string;
    area: {
      name: string | null;
    } | null;
    accessId: number;
    isReturned: boolean;
    booker: {
      name: string | null;
    } | null;
    saleMane: {
      name: string | null;
    } | null;
    company: {
      name: string | null;
    } | null;
    shop: {
      name: string | null;
    } | null;
    items: {
      products: {
        id: string;
        title: string | null;
        regularPrice: number | null;
        salePrice: number | null;
      }[];
      issueQuantity: number | null;
      returnQuantity: number | null;
    }[];
    distributor: {
      name: string | null;
    } | null;
    _count: {
      items: number;
    };
  } | null;
}

const PrintableInvoice = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { transaction } = props;

  const totalOfItems = transaction?.items.reduce((previous_item, next_item) => {
    const next_regular_price = Number(next_item.products[0].regularPrice);
    const next_sale_price = Number(next_item.products[0].salePrice);
    const next_item_issue_qty = Number(next_item.issueQuantity);
    const next_item_return_qty = Number(next_item.returnQuantity);

    const final_of_price = next_regular_price - next_sale_price;
    const final_of_qty = next_item_issue_qty - next_item_return_qty;

    return previous_item + final_of_price * final_of_qty;
  }, 0);

  return (
    <div ref={ref}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="py-1 text-left w-28">INVOICE #</TableCell>
            <TableCell className="py-1 text-left">
              {transaction?.accessId}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="py-1 text-left w-28">Company</TableCell>
            <TableCell className="py-1 text-left">
              {transaction?.company?.name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="py-1 text-left w-28">Area</TableCell>
            <TableCell className="py-1 text-left">
              {transaction?.area?.name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="py-1 text-left w-28">Shop</TableCell>
            <TableCell className="py-1 text-left">
              {transaction?.shop?.name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="py-1 text-left w-28">Booking By</TableCell>
            <TableCell className="py-1 text-left">
              {transaction?.booker?.name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="py-1 text-left w-28">Deliver By</TableCell>
            <TableCell className="py-1 text-left">
              {transaction?.saleMane?.name}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableCaption>A list of billing items.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Regular Price</TableHead>
            <TableHead>Sale Price</TableHead>
            <TableHead>Issue Quantity</TableHead>
            <TableHead>Return Quantity</TableHead>
            <TableHead>Gross Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transaction?.items.map((item) => {
            const product_regular_price = Number(item.products[0].regularPrice);
            const product_sale_price = Number(item.products[0].salePrice);
            const product_issue_qty = Number(item.issueQuantity);
            const product_return_qty = Number(item.returnQuantity);

            const final_of_price = product_regular_price ?? product_sale_price;
            const final_of_qty = product_issue_qty - product_return_qty;

            return (
              <TableRow key={item.products[0].id}>
                <TableCell className="py-1">{item.products[0].title}</TableCell>
                <TableCell className="py-1">
                  {priceFormatter.format(Number(item.products[0].regularPrice))}
                </TableCell>
                <TableCell className="py-1">
                  {priceFormatter.format(Number(item.products[0].salePrice))}
                </TableCell>
                <TableCell className="py-1">{item.issueQuantity}</TableCell>
                <TableCell className="py-1">{item.returnQuantity}</TableCell>
                <TableCell className="py-1">
                  {priceFormatter.format(final_of_price * final_of_qty)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="py-1 text-right ">Total Products</TableCell>
            <TableCell className="py-1 text-left w-28">
              {transaction?._count.items} Product(s)
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="py-1 text-right ">Total Items</TableCell>
            <TableCell className="py-1 text-left w-28">
              {transaction?.items.reduce((previous, next) => {
                const next_issue_qty = Number(next.issueQuantity);
                const next_return_qty = Number(next.returnQuantity);
                return previous + (next_issue_qty - next_return_qty);
              }, 0)}
              Item(s)
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="py-1 text-right">Total</TableCell>
            <TableCell className="w-40 py-1 text-left">
              {priceFormatter.format(Number(totalOfItems))}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
});
PrintableInvoice.displayName = "PrintableInvoice";
export default PrintableInvoice;
