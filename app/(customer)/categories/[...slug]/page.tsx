import { prisma } from "@/config/db";
import { Button } from "@tremor/react";
import ProductCard from "../../components/productsCard";

export default async function Page({ params }: { params: { slug: string[] } }) {
  const category = await prisma.categories.findMany({
    where: {
      name: params.slug.join(" "),
    },
    include: {
      subCategory: true,
      products: true,
    },
  });
  return (
    <div className="max-w-3xl mx-auto mt-4">
      <div className="flex items-center space-x-2">
        {category[0]?.subCategory?.map((sub, i) => (
          <Button
            key={i}
            size="xs"
            variant="secondary"
            className="rounded-full"
          >
            {sub.name}
          </Button>
        ))}
      </div>
      <div>
        <div className="grid grid-cols-2 gap-2 mt-4 md:grid-cols-4">
          {category[0]?.products?.map((p, i) => (
            <ProductCard key={i} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
