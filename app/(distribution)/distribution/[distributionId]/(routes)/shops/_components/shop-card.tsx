"use client";
import { Badge } from "@/components/ui/badge";
import { $Enums } from "@prisma/client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { memo } from "react";

interface Props {
  id: string;
  accessId: number | null;
  name: string | null;
  owner: string | null;
  phone: string | null;
  address: string | null;
  popType: $Enums.PopType | null;
  payType: $Enums.ShopPaymentType | null;
  areaId: string | null;
}

const ShopCard: React.FC<Props> = memo(({ id, name, payType, popType }) => {
  const distributionId = useParams()?.distributionId as string;
  return (
    <div
      key={id}
      className="flex flex-row items-center justify-between p-4 border rounded-lg"
    >
      <div className="flex flex-col space-y-1">
        <h2 className="text-base">{name}</h2>
        <div className="flex flex-row space-x-2">
          <Badge>{popType}</Badge>
          <Badge>{payType}</Badge>
        </div>
      </div>
      <Link href={`/distribution/${distributionId}/shops/${id}`}>Edit</Link>
    </div>
  );
});
ShopCard.displayName = "ShopCard";
export default ShopCard;
