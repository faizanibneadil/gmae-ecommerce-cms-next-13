import { authOptions } from "@/config/authOptions";
import { prisma } from "@/config/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { cache, memo, use } from "react";
import CreateDistribution from "./[distributionId]/_components/create-distribution";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Store } from "lucide-react";

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
      <div className="grid grid-cols-2 md:grid-cols-6 gap-x-1 gap-y-1">
        {distributions?.map((d) => (
          <Link key={d.id} href={`/distribution/${d.id}`} className="">
            <Card>
              <CardHeader>
                <Store />
              </CardHeader>
              <CardContent>{d.name}</CardContent>
            </Card>
          </Link>
        ))}
        <CreateDistribution />
      </div>
    </div>
  );
});
Page.displayName = "Page";
export default Page;
