import { EditIcon } from "@/app/_components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { prisma } from "@/config/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache, memo, use } from "react";

const getUsers = cache(async () => {
  const users = await prisma.user.findMany();
  return users;
});

const Page: React.FC<{}> = memo(() => {
  const users = use(getUsers());
  return users?.length ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
      {users?.map((c) => (
        <div
          key={c.id}
          className="flex flex-row items-center justify-between p-4 border rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={c.image?.toString()} />
              <AvatarFallback>{c.name?.slice(0, 2)}</AvatarFallback>
            </Avatar>

            <div className="space-y-0.5">
              <h2 className="text-base truncate">{c.name}</h2>
              <div className="flex flex-row items-center space-x-2">
                <Badge>{c?.role}</Badge>
              </div>
            </div>
          </div>
          <Link href={`/admin/users/${c.id}`}>
            <Button size="sm" variant="secondary" className="">
              <EditIcon width={16} height={16} />
            </Button>
          </Link>
        </div>
      ))}
    </div>
  ) : (
    notFound()
  );
});
Page.displayName = "Page";
export default Page;
