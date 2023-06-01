import { Categories } from "@prisma/client";
import Image from "next/image";

export default function CategoryCard({ category }: { category: Categories }) {
  return (
    <div className="w-full rounded-2xl bg-base-300">
      <Image
        width={400}
        height={400}
        src={`${category.image}`}
        alt={`${category.name}`}
        className="rounded-t-2xl"
      />
      <div className="px-4 py-2">
        <h5 className="mb-2 tracking-tight text-gray-900 text-md dark:text-white line-clamp-1">
          {category.name}
        </h5>
      </div>
    </div>
  );
}
