import { _getShops, _searchShops } from "@/queries";
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
import { notFound } from "next/navigation";

interface Props {
  params: { distributionId: string };
  searchParams: { [key: string]: string };
}

const Page: React.FC<Props> = async ({ params, searchParams }) => {
  const shops = searchParams?.query
    ? await _searchShops({
        distributionId: params.distributionId,
        query: searchParams?.query,
      })
    : await _getShops(params.distributionId);

  if (shops.length === 0) return notFound();

  return (
    <Suspense fallback={<div>fallBack Loading ...</div>}>
      <div className="w-full h-[calc(100vh-33px)] overflow-x-auto overflow-y-auto">
        <Table className="table-auto">
          <TableBody>
            {shops.map((shop) => (
              <TableRow key={shop.id}>
                <TableCell className="flex items-center py-1 font-medium text-left w-96">
                  {shop.name}
                </TableCell>
                <TableCell className="w-40 py-1 text-center">
                  {shop.popType}
                </TableCell>
                <TableCell className="w-40 py-1 text-center">
                  {shop.payType}
                </TableCell>
                <TableCell className="w-10 py-1 text-center">
                  <Link
                    href={`/distribution/${params.distributionId}/areas/${shop.id}`}
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
      </div>
    </Suspense>
  );
};
export default Page;
