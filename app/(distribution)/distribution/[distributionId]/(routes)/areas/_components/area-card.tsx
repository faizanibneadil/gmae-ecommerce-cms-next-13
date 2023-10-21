"use client";
import { EditIcon } from "@/app/_components/icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { memo } from "react";

interface Props {
  id: string;
  name: string | null;
}

const AreaCard: React.FC<Props> = memo(({ id, name }) => {
  const distributionId = useParams()?.distributionId as string;
  return (
    <div key={id} className="flex flex-col space-y-4">
      <Card className="flex flex-row items-center justify-between px-2 py-2">
        <div className="flex flex-row items-center space-x-2">
          <div className="flex flex-col">
            <p>{name}</p>
          </div>
        </div>
        <Link href={`/distribution/${distributionId}/areas/${id}`}>
          <Button variant="outline">
            <EditIcon className="w-4 h-4" />
          </Button>
        </Link>
      </Card>
    </div>
  );
});
AreaCard.displayName = "AreaCard";
export default AreaCard;
