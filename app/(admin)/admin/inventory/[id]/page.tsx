import { prisma } from "@/config/db";
import { memo, use, cache } from "react";
import Images from "./_components/images";
import PropertiesForm from "./_components/properies-form";
import { Button } from "@tremor/react";
import Link from "next/link";
import { PlusIcon } from "@/app/_components/icons";
import AttributesForm from "./_components/attributes-form";
import VariantsLists from "./_components/variants-lists";

interface Props {
  params: { id: string };
  searchParams: { [key: string]: string };
}

const getCategories = cache(async () => {
  const categories = await prisma.categories.findMany({
    select: { id: true, name: true },
  });
  return categories;
});

const getProperties = cache(async (id: string) => {
  const properties = await prisma.products.findUnique({
    include: { Categories: { select: { id: true } } },
    where: { id },
  });
  return properties;
});

const getAttributes = cache(async (id: string) => {
  const attributes = await prisma.attributes.findMany({
    where: { product: { id } },
  });
  return attributes;
});

const Page: React.FC<Props> = ({ params, searchParams }) => {
  const categories = use(getCategories());
  const properties = use(getProperties(params.id));
  const attributes = use(getAttributes(params.id));
  return (
    <div>
      <Images props={{ productId: params.id }} />
      <PropertiesForm
        props={{
          productId: params.id,
          categories,
          properties,
        }}
      />
      <AttributesForm
        props={{
          productId: params.id,
          attributes,
        }}
      />
      <VariantsLists props={{ productId: params.id }} />
      <Link
        href={`/admin/inventory/${params?.id}/variants?query=${properties?.title}`}
      >
        <Button icon={PlusIcon} className="w-full mt-2" variant="secondary">
          Add Variants
        </Button>
      </Link>
    </div>
  );
};

export default Page;
