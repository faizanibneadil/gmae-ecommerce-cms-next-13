import { Button } from "@/components/ui/button";
import { authOptions } from "@/config/authOptions";
import { prisma } from "@/config/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { cache, memo, use } from "react";

const getDistributions = cache(async (userId: string | undefined) => {
  const distributions = await prisma.distributors.findMany({
    where: { users: { some: { id: userId } } },
  });
  return distributions;
});

const Page: React.FC<{}> = memo(() => {
  const session = use(getServerSession(authOptions));
  const distributions = use(getDistributions(session?.user.id as string));
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col space-y-2">
        {distributions?.map((d) => (
          <Link key={d.id} href={`/distribution/${d.id}`} className="px-4 py-2">
            {d.name}
          </Link>
        ))}
      </div>
    </div>
  );
});
Page.displayName = "Page";
export default Page;
