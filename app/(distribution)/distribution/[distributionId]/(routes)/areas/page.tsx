import { _getAreas, _searchAreas } from "@/queries";
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
  const areas = searchParams?.query
    ? await _searchAreas({
        distributionId: params.distributionId,
        query: searchParams?.query,
      })
    : await _getAreas(params.distributionId);

  if (areas.length === 0) return notFound();

  return (
    <Suspense fallback={<div>fallBack Loading ...</div>}>
      <div className="w-full h-[calc(100vh-33px)] overflow-x-auto overflow-y-auto">
        <Table className="table-auto">
          <TableBody>
            {areas.map((area) => (
              <TableRow key={area.id}>
                <TableCell className="py-1 font-medium text-left w-96">
                  {area.name}
                </TableCell>
                <TableCell className="w-40 py-1 text-center">
                  {area._count.shops} Shops
                </TableCell>
                <TableCell className="w-10 py-1 text-center">
                  <Link
                    href={`/distribution/${params.distributionId}/areas/${area.id}`}
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
