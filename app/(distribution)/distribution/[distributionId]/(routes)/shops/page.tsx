import { prisma } from "@/config/db";
import { cache, memo, use } from "react";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const getShops = cache(async (distributionId: string) => {
  const shops = await prisma.shops.findMany({
    where: { distributors: { some: { id: distributionId } } },
  });
  return shops;
});
const Page: React.FC<{
  params: { distributionId: string };
}> = memo(({ params }) => {
  const shops = use(getShops(params.distributionId));
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
      {shops?.map((shop) => (
        <div
          key={shop.id}
          className="flex flex-row items-center justify-between p-4 border rounded-lg"
        >
          <div className="flex flex-col space-y-1">
            <h2 className="text-base">{shop.name}</h2>
            <div className="flex flex-row space-x-2">
              <Badge>{shop.popType}</Badge>
              <Badge>{shop.payType}</Badge>
            </div>
          </div>
          <Link
            href={`/distribution/${params.distributionId}/shops/${shop.id}`}
          >
            Edit
          </Link>
        </div>
      ))}
    </div>
  );
});
Page.displayName = "Page";
export default Page;
