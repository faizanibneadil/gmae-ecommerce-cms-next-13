import { Button } from "@tremor/react";
import ProductCard from "../../_components/productsCard";
import { getCategoryAndProductsBySlug } from "./_queries";
import Link from "next/link";

export default async function Page({ params }: { params: { slug: string } }) {
  const { category } = await getCategoryAndProductsBySlug({
    slug: params.slug,
  });
  return (
    <div className="max-w-3xl mx-auto mt-4">
      <div className="flex items-center space-x-2">
        {category?.subCategory?.map((sub) => (
          <Link
            href={`/categories/${sub.slug}`}
            key={sub.id}
            className="p-2 px-4 rounded-full ring-2 ring-blue-600"
          >
            {sub.name}
          </Link>
        ))}
      </div>
      <div>
        <div className="grid grid-cols-2 gap-2 mt-4 md:grid-cols-4">
          {category?.Products?.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
