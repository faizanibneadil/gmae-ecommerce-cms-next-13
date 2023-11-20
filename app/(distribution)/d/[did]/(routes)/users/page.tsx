import { _getUsers, _searchUsers } from "@/queries";
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
  const users = searchParams?.query
    ? await _searchUsers({
        did: params.did,
        query: searchParams?.query,
      })
    : await _getUsers(params.did);

  if (users.length === 0) return notFound();

  return (
    <Table>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="py-1 font-medium text-left w-96">
              {user.name}
            </TableCell>
            <TableCell className="w-40 py-1 text-center">{user.role}</TableCell>
            <TableCell className="w-10 py-1 text-center">
              <Link
                href={`/d/${params.did}/users/${user.id}`}
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
