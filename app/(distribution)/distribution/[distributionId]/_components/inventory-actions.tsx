"use client";

import {
  EditIcon,
  ImageIcon,
  PencilIcon,
  PlusIcon,
  UserIcon,
} from "@/app/_components/icons";
import { buttonVariants } from "@/components/ui/button";
import {
  Factory,
  ImagePlus,
  List,
  ListChecks,
  PackagePlus,
  PackageSearch,
  Pencil,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const InventoryActions: React.FC<{}> = () => {
  const distributionId = useParams()?.distributionId as string;
  const inventoryId = useParams()?.inventoryId as string;

  const path = (next: string) => {
    return `/distribution/${distributionId}/inventory/${inventoryId}${next}`;
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
        href={path("/companies")}
        className="h-8 px-1.5 py-1.5 bg-primary text-white rounded-none"
      >
        <Factory className="w-4 h-4" />
      </Link>
      <Link
        href={path("/categories")}
        className="h-8 px-1.5 py-1.5 bg-primary text-white rounded-none"
      >
        <ListChecks className="w-4 h-4" />
      </Link>
      <Link
        href={path("/images")}
        className="h-8 px-1.5 py-1.5 bg-primary text-white rounded-none"
      >
        <ImagePlus className="w-4 h-4" />
      </Link>
      <Link
        href={path("/variants")}
        className="h-8 px-1.5 py-1.5 bg-primary text-white rounded-none"
      >
        <PackagePlus className="w-4 h-4" />
      </Link>
      <Link
        href={path("/attributes")}
        className="h-8 px-1.5 py-1.5 bg-primary text-white rounded-none"
      >
        <List className="w-4 h-4" />
      </Link>
      <Link
        href={path("/seo")}
        className="h-8 px-1.5 py-1.5 bg-primary text-white rounded-none"
      >
        <PackageSearch className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default InventoryActions;
