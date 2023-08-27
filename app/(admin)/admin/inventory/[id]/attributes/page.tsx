import PageHeader from "@/app/(admin)/_components/page-header";
import { prisma } from "@/config/db";
import { Card } from "@tremor/react";
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
    <div>
      <PageHeader
        backRoute={`/admin/inventory/${params?.id}`}
        enableBackButton={true}
        pageDescription="Add product Attributes."
        pageHeading="Attributes"
      />
      <div className="max-w-2xl mx-auto mt-4">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          <NewAttribute />
          {attributes?.map((a) => (
            <AttributeItemForm key={a.id} attribute={a} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Page;
