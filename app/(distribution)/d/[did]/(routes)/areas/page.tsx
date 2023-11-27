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
import { PageProps } from "@/types";

const Page: React.FC<PageProps> = async ({ params, searchParams }) => {
  const areas = searchParams?.query
    ? await _searchAreas({
        did: params.did,
        query: searchParams?.query,
      })
    : await _getAreas(params.did);

  return (
    <Table>
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
                href={`/d/${params.did}/areas/${area.id}`}
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
