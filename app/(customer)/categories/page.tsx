import { prisma } from "@/config/db";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60

export default async function Page() {
  const categories = await prisma.categories.findMany({ include: { images:true}});
  return (
    <div className="max-w-3xl p-2 mx-auto mt-4">
      <div className="gap-2 space-y-2 columns-2 md:columns-3">
        {categories.map((category, i) => (
          <div key={i} className="relative h-48 rounded-md">
            <Link href={`/categories/${category.name?.split(" ").join("/")}`}>
              <Image
                src={`https://drive.google.com/uc?export=view&id=${category.images?.src}`}
                fill
                className="object-cover rounded-md"
                alt={`${category.name}`}
              />
              <div className="absolute inset-0 flex items-center justify-center text-lg text-center text-white rounded-md bg-gray-700/40">
                {category.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
