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
import { _getBrands, _searchBrands } from "@/queries";

interface Props {
  params: { distributionId: string };
  searchParams: { [key: string]: string };
}

const Page: React.FC<Props> = async ({ params, searchParams }) => {
  const brands = searchParams?.query
    ? await _searchBrands({
        distributionId: params.distributionId,
        query: searchParams?.query,
      })
    : await _getBrands(params.distributionId);

  if (brands.length === 0) return notFound();

  return (
    <Table>
      <TableBody>
        {brands.map((brand) => (
          <TableRow key={brand.id}>
            <TableCell className="py-1 font-medium text-left w-96">
              {brand.name}
            </TableCell>
            <TableCell className="w-40 py-1 text-center">
              {brand._count.products} Products
            </TableCell>
            <TableCell className="w-10 py-1 text-center">
              <Link
                href={`/distribution/${params.distributionId}/brands/${brand.id}`}
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
