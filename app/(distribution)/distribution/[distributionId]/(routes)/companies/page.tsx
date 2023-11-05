import { _getCompanies, _searchCompanies } from "@/queries";
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

interface Props {
  params: { distributionId: string };
  searchParams: { [key: string]: string };
}

const Page: React.FC<Props> = async ({ params, searchParams }) => {
  const companies = searchParams?.query
    ? await _searchCompanies({
        distributionId: params.distributionId,
        query: searchParams?.query,
      })
    : await _getCompanies(params.distributionId);

  if (companies.length === 0) return notFound();

  return (
    <Table>
      <TableBody>
        {companies.map((company) => (
          <TableRow key={company.id}>
            <TableCell className="py-1 font-medium text-left w-96">
              {company.name}
            </TableCell>
            <TableCell className="w-40 py-1 text-center">
              {company._count.products} Products
            </TableCell>
            <TableCell className="w-10 py-1 text-center">
              <Link
                href={`/distribution/${params.distributionId}/companies/${company.id}`}
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
