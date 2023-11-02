import { _getShops } from "@/queries";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
import { Suspense } from "react";

interface Props {
  params: { distributionId: string };
}

const Page: React.FC<Props> = async ({ params }) => {
  const shops = await _getShops(params.distributionId);
  return (
    <Suspense fallback={<div>fallBack Loading ...</div>}>
      <ScrollArea className="w-full h-auto border rounded-md">
        <ScrollBar orientation="horizontal" />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left w-96">Name</TableHead>
              <TableHead className="w-20 text-center">Pop Type</TableHead>
              <TableHead className="w-40 text-center">Pay Type</TableHead>
              <TableHead className="w-10 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shops.map((shop) => (
              <TableRow key={shop.id}>
                <TableCell className="font-medium text-left w-96">
                  {shop.name}
                </TableCell>
                <TableCell className="w-20 text-center">
                  {shop.popType}
                </TableCell>
                <TableCell className="w-40 text-center">
                  {shop.payType}
                </TableCell>
                <TableCell className="w-10 text-center">
                  <Link
                    href={`/distribution/${params.distributionId}/shops/${shop.id}`}
                    className={buttonVariants({
                      variant: "secondary",
                      size: "sm",
                      className: "flex w-full",
                    })}
                  >
                    <PencilIcon className="w-4 h-4 mr-2" /> Edit
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </Suspense>
  );
};
export default Page;
