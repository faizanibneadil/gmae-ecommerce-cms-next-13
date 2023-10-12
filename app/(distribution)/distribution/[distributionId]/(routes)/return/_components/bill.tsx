"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";
import { memo, useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";
import Link from "next/link";
import { Lock } from "lucide-react";

type TBills = {
  id: string;
  accessId: number;
  isReturned: boolean;
  createdAt: Date;
};

const Bill: React.FC<{
  bill: TBills;
}> = memo(({ bill }) => {
  const distributionId = useParams()?.distributionId as string;
  return (
    <Link
      href={`/distribution/${distributionId}/return/${bill.id}`}
      key={bill.id}
      className="flex items-center justify-between px-4 py-2 border rounded-md"
    >
      <div className="flex flex-row items-center space-x-1">
        <Badge variant="secondary">ID:{bill.accessId}</Badge>
        <Badge variant="outline">{bill.createdAt.toLocaleDateString()}</Badge>
      </div>
      {bill.isReturned ? <Lock className="w-4 h-4" /> : null}
    </Link>
  );
});
Bill.displayName = "Bill";
export default Bill;
