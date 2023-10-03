"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { memo, useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";
import Link from "next/link";
import { Lock } from "lucide-react";

interface TBill {
  id: string;
  accessId: number;
  createdAt: Date;
  isReturned: boolean;
}

const Bill: React.FC<{
  bill: TBill;
}> = memo(({ bill }) => {
  return (
    <Link
      href={`/return/${bill.id}`}
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
