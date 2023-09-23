"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { memo } from "react";

interface TTransactions {
  id: string;
  accessId: number;
  createdAt: Date;
}

const TransactionItem: React.FC<{
  transaction: TTransactions;
}> = memo(({ transaction }) => {
  return (
    <Card
      key={transaction.id}
      className="flex items-center justify-between px-4 py-2 rounded-md"
    >
      <div className="flex flex-row items-center space-x-1">
        <Badge variant="secondary">ID:{transaction.accessId}</Badge>
        <Badge variant="outline">
          {transaction.createdAt.toLocaleDateString()}
        </Badge>
      </div>
      <button>
        <Badge variant="destructive">Open</Badge>
      </button>
    </Card>
  );
});
TransactionItem.displayName = "TransactionItem";
export default TransactionItem;
