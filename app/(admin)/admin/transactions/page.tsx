import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { prisma } from "@/config/db";
import { notFound } from "next/navigation";
import { cache, memo, use } from "react";
import TransactionFilters from "./_components/transactions-filters";
import Transactions from "./_components/transactions";
// import Transactions from "./_components/transactions";

const lastDay = Date.now() - 24 * 60 * 60 * 1000;
const day = new Date(lastDay).toISOString();

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
    where: {
      createdAt: {
        gte: day,
      },
    },
  });
  return transactions;
});

const Page: React.FC<{}> = memo(() => {
  const transactions = use(getTransactions());
  return transactions.length ? (
    <div className="space-y-1">
      <TransactionFilters />
      <Transactions initialTransactions={transactions} />
    </div>
  ) : (
    notFound()
  );
});

Page.displayName = "Page";
export default Page;
