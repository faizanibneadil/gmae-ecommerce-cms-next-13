"use client";

import { Pencil, Store, Users, Users2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const AreasActions: React.FC<{}> = () => {
  const did = useParams()?.did as string;
  const areaId = useParams()?.areaId as string;

  const path = (next: string) => {
    return `/d/${did}/inventory/${areaId}${next}`;
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
        href={path("/shops")}
        className="h-8 px-1.5 py-1.5 bg-primary text-white rounded-none"
      >
        <Store className="w-4 h-4" />
      </Link>
      <Link
        href={path("/sales-men")}
        className="h-8 px-1.5 py-1.5 bg-primary text-white rounded-none"
      >
        <Users className="w-4 h-4" />
      </Link>
      <Link
        href={path("/bookers")}
        className="h-8 px-1.5 py-1.5 bg-primary text-white rounded-none"
      >
        <Users2 className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default AreasActions;
