import { FC, cache } from "react";
import CreateAttributesForm from "./_components/create-attributes-form";
import AttributesList from "./_components/attributes-list";
import { prisma } from "@/config/db";

const getAttributesByProductId = cache(async (id: string) => {
  const attributes = await prisma.attributes.findMany({
    where: { product: { id: id } },
    select: { id: true, name: true, value: true },
  });
  return attributes;
});

interface Props {
  params: { id: string };
  searchParams: { [key: string]: string };
}

const Page = async ({ params, searchParams }:Props) => {
  const attributes = await getAttributesByProductId(params.id);
  return (
    <div className="space-y-2">
      <CreateAttributesForm id={params.id} attributeId={searchParams?.attrId} />
      <AttributesList attributes={attributes} />
    </div>
  );
};

export default Page;
