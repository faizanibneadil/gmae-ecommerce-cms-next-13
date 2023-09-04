import Link from "next/link";
import { cache } from "react";
import { prisma } from "@/config/db";

const getCategory = cache(async (slug: string) => {
  const category = await prisma.categories.findUnique({
    select: {
      id: true,
      name: true,
      slug: true,
      images: {
        select: {
          id: true,
          src: true,
        },
      },
      Products: {
        select: {
          id: true,
          title: true,
          slug: true,
          images: {
            select: {
              src: true,
            },
            take: 1,
          },
        },
      },
    },
    where: {
      slug: slug,
    },
  });
  return category;
});

export default async function Page({ params }: { params: { slug: string } }) {
  const category = await getCategory(params.slug);
  return (
    <div className="max-w-3xl mx-auto mt-4">
      {/* <div className="flex items-center space-x-2">
        {category?.subCategory?.map((sub) => (
          <Link
            href={`/categories/${sub.slug}`}
            key={sub.id}
            className="p-2 px-4 rounded-full ring-2 ring-blue-600"
          >
            {sub.name}
          </Link>
        ))}
      </div> */}
      <div>
        {/* <div className="grid grid-cols-2 gap-2 mt-4 md:grid-cols-4">
          {category?.Products?.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div> */}
      </div>
    </div>
  );
}
