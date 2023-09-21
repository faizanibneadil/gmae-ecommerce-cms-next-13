import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { prisma } from "@/config/db";
import { notFound } from "next/navigation";
import { cache, memo, use } from "react";
import { format } from "date-fns";
import TransactionFilters from "./_components/transactions-filters";

const getTransactions = cache(async () => {
  const transactions = await prisma.billing.findMany({
    select: {
      id: true,
      accessId: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return transactions;
});

const Page: React.FC<{}> = memo(() => {
  const transactions = use(getTransactions());
  return transactions.length ? (
    <div className="space-y-1">
      <TransactionFilters />
      <div className="flex flex-col space-y-1">
        {transactions?.map((transaction) => (
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
        ))}
      </div>
    </div>
  ) : (
    notFound()
  );
});

Page.displayName = "Page";
export default Page;
