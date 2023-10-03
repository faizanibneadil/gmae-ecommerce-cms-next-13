import { prisma } from "@/config/db";
import { notFound } from "next/navigation";
import { cache, memo, use } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EditIcon } from "@/app/_components/icons";

const getAreas = cache(async () => {
  const areas = await prisma.areas.findMany({
    select: { id: true, name: true },
  });
  return areas;
});

const Page: React.FC<{
  params: { distributionId: string };
}> = memo(({ params }) => {
  const areas = use(getAreas());
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
      {areas?.map((area) => (
        <div key={area.id} className="flex flex-col space-y-4">
          <Card className="flex flex-row items-center justify-between px-2 py-2">
            <div className="flex flex-row items-center space-x-2">
              <div className="flex flex-col">
                <p>{area.name}</p>
              </div>
            </div>
            <Link
              href={`/distribution/${params.distributionId}/areas/${area.id}`}
            >
              <Button variant="outline">
                <EditIcon className="w-4 h-4" />
              </Button>
            </Link>
          </Card>
        </div>
      ))}
    </div>
  );
});
Page.displayName = "Page";
export default Page;
