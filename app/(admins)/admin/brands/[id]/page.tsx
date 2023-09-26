import { cache, memo, use } from "react";
import CreateBrandsForm from "./_components/brands-form";
import { prisma } from "@/config/db";

const getBrand = cache(async (id: string) => {
  const brand = await prisma.brands.findUnique({ where: { id } });
  return brand;
});

const Page: React.FC<{
  params: { id: string };
}> = memo(({ params }) => {
  const brand = use(getBrand(params?.id));
  return (
    <div className="mx-auto max-w-4xl">
      <CreateBrandsForm brand={brand} />
    </div>
  );
});

Page.displayName = "Page";
export default Page;
