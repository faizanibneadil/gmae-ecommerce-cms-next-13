import { prisma } from "@/config/db";
import { cache, use } from "react";
import AttributeItemForm from "./_components/attribute-item-form";
import NewAttribute from "./_components/add-attribute-button";

const getAttributes = cache(async (id: string) => {
  const attributes = await prisma.attributes.findMany({
    where: { product: { id } },
  });
  return attributes;
});

const Page: React.FC<{
  params: { id: string };
}> = ({ params }) => {
  const attributes = use(getAttributes(params.id));
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
      <NewAttribute />
      {attributes?.map((a) => (
        <AttributeItemForm key={a.id} attribute={a} />
      ))}
    </div>
  );
};
export default Page;
