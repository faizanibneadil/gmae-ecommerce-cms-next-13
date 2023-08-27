import { prisma } from "@/config/db";
import { use, cache } from "react";
import PropertiesForm from "./_components/properies-form";
import PageHeader from "@/app/(admin)/_components/page-header";

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

const Page: React.FC<Props> = ({ params, searchParams }) => {
  const categories = use(getCategories());
  const properties = use(getProperties(params.id));
  return (
    <div>
      <div className="max-w-2xl mx-auto">
        <PropertiesForm
          props={{
            productId: params.id,
            categories,
            properties,
          }}
        />
      </div>
    </div>
  );
};

export default Page;
