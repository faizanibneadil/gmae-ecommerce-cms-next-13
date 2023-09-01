import { prisma } from "@/config/db";
import { notFound } from "next/navigation";
import { cache, memo, use } from "react";
import EditBrand from "./_components/edit-brand-button";

const getBrands = cache(async () => {
  const brands = await prisma.brands.findMany({
    select: { id: true, name: true, _count: { select: { products: true } } },
  });
  return brands;
});
const Page: React.FC<{}> = memo(() => {
  const brands = use(getBrands());
  return brands?.length ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
      {brands?.map((brand) => (
        <div
          key={brand.id}
          className="flex flex-row items-center justify-between p-4 border rounded-lg"
        >
          <h2 className="text-base">{brand.name}</h2>
          <EditBrand id={brand.id} />
        </div>
      ))}
    </div>
  ) : (
    notFound()
  );
});
Page.displayName = "Page";
export default Page;
