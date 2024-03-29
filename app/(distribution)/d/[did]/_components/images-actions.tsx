"use client";

import { Image as ImageIcon, ListChecks, Pencil } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const ImagesActions: React.FC<{}> = () => {
  const did = useParams()?.did as string;
  const imageId = useParams()?.imageId as string;

  const path = (next: string) => {
    return `/d/${did}/images/${imageId}${next}`;
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
        <ImageIcon className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default ImagesActions;
