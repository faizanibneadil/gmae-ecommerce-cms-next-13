"use client";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useParams } from "next/navigation";
import { memo } from "react";

interface Props {
  id: string;
  name: string | null;
  _count: {
    products: number;
  };
}

const CompanyCard: React.FC<Props> = memo(({ _count, id, name }) => {
  const distributionId = useParams()?.distributionId as string;
  return (
    <div key={id} className="flex flex-col space-y-4">
      <Card className="flex flex-row items-center justify-between px-2 py-2">
        <div className="flex flex-row items-center space-x-2">
          <div className="flex flex-col">
            <p>{name}</p>
          </div>
        </div>
        <Link href={`/distribution/${distributionId}/companies/${id}`}>
          Edit
        </Link>
      </Card>
    </div>
  );
});
CompanyCard.displayName = "CompanyCard";
export default CompanyCard;
