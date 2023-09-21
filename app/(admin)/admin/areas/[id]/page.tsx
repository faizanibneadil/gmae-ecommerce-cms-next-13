import { prisma } from "@/config/db";
import { cache, memo, use } from "react";
import CreateAreaForm from "./_components/create-area-form";

const getAreaById = cache(async (id: string) => {
  const area = await prisma.areas.findUnique({ where: { id } });
  return area;
});

const Page: React.FC<{
  params: { id: string };
}> = memo(({ params }) => {
  const area = use(getAreaById(params?.id));
  return (
    <div className="max-w-4xl mx-auto">
      <CreateAreaForm areas={area} />
    </div>
  );
});

Page.displayName = "Page";
export default Page;
