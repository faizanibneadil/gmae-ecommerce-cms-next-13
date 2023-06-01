"use client";

import { Categories } from "@prisma/client";
import { CldImage } from "next-cloudinary";

export default function CategoryCard({ category }: { category: Categories }) {
  return (
    <div className="w-full rounded-2xl bg-base-300">
      <CldImage
        fetchPriority="auto"
        width={400}
        height={400}
        crop="thumb"
        gravity="faces"
        src={`${category.image}`}
        alt={`${category.name}`}
      />
      {/* <img className="rounded-t-2xl" src={`${category.image}`} /> */}
      <div className="px-4 py-2">
        <h5 className="mb-2 tracking-tight text-gray-900 text-md dark:text-white line-clamp-1">
          {category.name}
        </h5>
      </div>
    </div>
  );
}
