"use client";

import { Package, Pencil, Target, Users } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const CompanyActions: React.FC<{}> = () => {
  const did = useParams()?.did as string;
  const companyId = useParams()?.companyId as string;

  const path = (next: string) => {
    return `/d/${did}/companies/${companyId}${next}`;
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
        href={path("/brands")}
        className="h-8 px-1.5 py-1.5 bg-primary text-white rounded-none"
      >
        <Target className="w-4 h-4" />
      </Link>
      <Link
        href={path("/inventory")}
        className="h-8 px-1.5 py-1.5 bg-primary text-white rounded-none"
      >
        <Package className="w-4 h-4" />
      </Link>
      <Link
        href={path("/bookers")}
        className="h-8 px-1.5 py-1.5 bg-primary text-white rounded-none"
      >
        <Users className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default CompanyActions;
