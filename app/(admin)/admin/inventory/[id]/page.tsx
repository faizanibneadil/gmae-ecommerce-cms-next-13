import { prisma } from "@/config/db";
import { use, cache } from "react";
import PropertiesForm from "./_components/properties-form";

const getProperties = cache(async (id: string) => {
  const properties = await prisma.products.findUnique({
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      regularPrice: true,
      salePrice: true,
      purchasePrice: true,
      purchaseLimit: true,
      stock: true,
    },
    where: { id },
  });
  return properties;
});

const Page: React.FC<{
  params: { id: string };
  searchParams: { [key: string]: string };
}> = ({ params, searchParams }) => {
  const properties = use(getProperties(params.id));
  return (
    <div>
      <div className="max-w-2xl mx-auto">
        <PropertiesForm properties={properties} />
      </div>
    </div>
  );
};

export default Page;
