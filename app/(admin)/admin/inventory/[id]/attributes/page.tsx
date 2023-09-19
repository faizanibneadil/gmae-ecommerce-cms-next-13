import { prisma } from "@/config/db";
import { cache, use } from "react";
import { Card } from "@/components/ui/card";
import CreateAttributeForm from "./_components/create-attribute-form";
import DeleteAttribute from "./_components/delete-attribute";
import { Badge } from "@/components/ui/badge";

const getAttributes = cache(async (id: string) => {
  const attributes = await prisma.attributes.findMany({
    where: { product: { id } },
    orderBy: { name: "desc" },
  });
  return attributes;
});

const Page: React.FC<{
  params: { id: string };
}> = ({ params }) => {
  const attributes = use(getAttributes(params.id));
  return (
    <div className="flex flex-col space-y-2 ">
      <div className="flex flex-row flex-wrap gap-y-1 gap-x-1">
        {attributes?.map((at) => (
          <Badge
            key={at.id}
            variant="outline"
            className="flex items-center space-x-1 px-0.5"
          >
            <Badge variant="secondary">{at.name}</Badge>
            <Badge variant="secondary">{at.value}</Badge>
            <Badge className="px-0.5" variant="destructive">
              <DeleteAttribute attributeId={at.id} />
            </Badge>
          </Badge>
        ))}
      </div>

      <CreateAttributeForm />
    </div>
  );
};
export default Page;
