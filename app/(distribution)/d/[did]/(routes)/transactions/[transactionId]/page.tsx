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
import { _getTransactionById } from "@/queries";
import { PageProps } from "@/types";

const Page: React.FC<PageProps> = async ({ params }) => {
  const transaction = await _getTransactionById({
    transactionId: params.transactionId,
  });

  const totalOfItems = transaction?.items.reduce(
    (pre_item, nxt_item) =>
      pre_item +
      (Number(nxt_item.products[0].regularPrice) -
        Number(nxt_item.products[0].salePrice)) *
        (Number(nxt_item.issueQuantity) - Number(nxt_item.returnQuantity)),
    0
  );
  return (
    <div>
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
          {transaction?.items.map((item) => (
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
                {priceFormatter.format(
                  (Number(item.products[0].regularPrice) ??
                    Number(item.products[0].salePrice)) *
                    (Number(item.issueQuantity) - Number(item.returnQuantity))
                )}
              </TableCell>
            </TableRow>
          ))}
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
              {transaction?.items.reduce(
                (pre, nxt) =>
                  pre +
                  (Number(nxt.issueQuantity) - Number(nxt.returnQuantity)),
                0
              )}{" "}
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
};

export default Page;
