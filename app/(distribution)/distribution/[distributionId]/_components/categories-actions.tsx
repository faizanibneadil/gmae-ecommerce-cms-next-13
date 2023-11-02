"use client";

import { Image as ImageIcon, ListChecks, Package, Pencil } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const CategoriesActions: React.FC<{}> = () => {
  const distributionId = useParams()?.distributionId as string;
  const categoryId = useParams()?.categoryId as string;

  const path = (next: string) => {
    return `/distribution/${distributionId}/categories/${categoryId}${next}`;
  };

  return (
    <div className="flex space-x-0.5">
      <Link
        href={path("/")}
        className="h-8 px-1.5 py-1.5 bg-primary text-white rounded-none"
      >
        <Pencil className="w-4 h-4" />
      </Link>
      <Link
        href={path("/categories")}
        className="h-8 px-1.5 py-1.5 bg-primary text-white rounded-none"
      >
        <ListChecks className="w-4 h-4" />
      </Link>
      <Link
        href={path("/products")}
        className="h-8 px-1.5 py-1.5 bg-primary text-white rounded-none"
      >
        <Package className="w-4 h-4" />
      </Link>
      <Link
        href={path("/images")}
        className="h-8 px-1.5 py-1.5 bg-primary text-white rounded-none"
      >
        <ImageIcon className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default CategoriesActions;
