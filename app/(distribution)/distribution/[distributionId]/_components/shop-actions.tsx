"use client";

import { Pencil, Map } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const ShopsActions: React.FC<{}> = () => {
  const distributionId = useParams()?.distributionId as string;
  const shopId = useParams()?.shopId as string;

  const path = (next: string) => {
    return `/distribution/${distributionId}/shops/${shopId}${next}`;
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
        href={path("/areas")}
        className="h-8 px-1.5 py-1.5 bg-primary text-white rounded-none"
      >
        <Map className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default ShopsActions;
