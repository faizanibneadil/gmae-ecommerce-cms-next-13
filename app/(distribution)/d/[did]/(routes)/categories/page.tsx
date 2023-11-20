import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { _getAdminCategories, _searchCategories } from "@/queries";
import { PageProps } from "@/types";

const Page: React.FC<PageProps> = async ({ params, searchParams }) => {
  const categories = searchParams?.query
    ? await _searchCategories({
        did: params.did,
        query: searchParams?.query,
      })
    : await _getAdminCategories(params.did);

  if (categories.length === 0) return notFound();

  return (
    <Suspense fallback={<div>fallBack Loading ...</div>}>
      <div className="w-full h-[calc(100vh-33px)] overflow-x-auto overflow-y-auto">
        <Table className="table-auto">
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="flex items-center py-1 space-x-2 font-medium text-left w-96">
                  <Avatar>
                    <AvatarImage
                      src={`https://lh3.googleusercontent.com/d/${category?.images?.src}=s220`}
                    />
                    <AvatarFallback>
                      {category.name?.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{category.name}</span>
                </TableCell>
                <TableCell className="w-40 py-1 text-center">
                  {category._count.subCategories} Sub Categories
                </TableCell>
                <TableCell className="w-10 py-1 text-center">
                  <Link
                    href={`/d/${params.did}/categories/${category.id}`}
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
