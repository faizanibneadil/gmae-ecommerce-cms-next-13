import { _getShops, _searchShops } from "@/queries";
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
import { notFound } from "next/navigation";
import { PageProps } from "@/types";

const Page: React.FC<PageProps> = async ({ params, searchParams }) => {
  const shops = searchParams?.query
    ? await _searchShops({
        did: params.did,
        query: searchParams?.query,
      })
    : await _getShops(params.did);

  if (shops.length === 0) return notFound();

  return (
    <Table>
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
                href={`/d/${params.did}/shops/${shop.id}`}
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
  );
};
export default Page;
