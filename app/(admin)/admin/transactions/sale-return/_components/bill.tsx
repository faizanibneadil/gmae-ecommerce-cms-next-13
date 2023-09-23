"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { memo, useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";

interface TBill {
  id: string;
  accessId: number;
  createdAt: Date;
}

const Bill: React.FC<{
  bill: TBill;
}> = memo(({ bill }) => {
  const { push } = useRouter();
  const [pending, start] = useTransition();
  const action = () =>
    start(() => push(`/admin/transactions/sale-return/${bill.id}`));
  return (
    <Card
      key={bill.id}
      className="flex items-center justify-between px-4 py-2 rounded-md"
    >
      <div className="flex flex-row items-center space-x-1">
        <Badge variant="secondary">ID:{bill.accessId}</Badge>
        <Badge variant="outline">{bill.createdAt.toLocaleDateString()}</Badge>
      </div>
      <button disabled={pending} onClick={action}>
        <Badge variant="destructive">
          {pending ? <Spin className="w-4 h-4" /> : `Open`}
        </Badge>
      </button>
    </Card>
  );
});
Bill.displayName = "Bill";
export default Bill;
