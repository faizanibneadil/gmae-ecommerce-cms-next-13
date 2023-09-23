import { prisma } from "@/config/db";
import { notFound } from "next/navigation";
import { cache, memo, use } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import EditArea from "./_components/edit-area-button";

const getAreas = cache(async () => {
  const areas = await prisma.areas.findMany({
    select: { id: true, name: true },
  });
  return areas;
});

const Page: React.FC<{}> = memo(() => {
  const areas = use(getAreas());
  return areas?.length ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
      {areas?.map((company) => (
        <div key={company.id} className="flex flex-col space-y-4">
          <Card className="flex flex-row items-center justify-between px-2 py-2">
            <div className="flex flex-row items-center space-x-2">
              <div className="flex flex-col">
                <p>{company.name}</p>
              </div>
            </div>
            <EditArea id={company.id} />
          </Card>
        </div>
      ))}
    </div>
  ) : (
    notFound()
  );
});
Page.displayName = "Page";
export default Page;