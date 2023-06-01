"use client";

import { Categories } from "@prisma/client";

export default function CategoryCard({ category }: { category: Categories }) {
  return (
    <div className="w-[15rem] rounded-2xl bg-base-300">
      <img className="rounded-t-2xl" src={`${category.image}`} />
      <div className="px-4 py-2">
        <h5 className="mb-2 tracking-tight text-gray-900 text-md dark:text-white line-clamp-1">
          {category.name}
        </h5>
      </div>
    </div>
  );
}
