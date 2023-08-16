"use client";

import { Button, Icon } from "@tremor/react";
import { ArrowRightLeft } from "lucide-react";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";

const TransactionsRoute: React.FC<{}> = () => {
  const { push } = useRouter();
  const [going, goto] = useTransition();
  const go = () => goto(() => push("/admin/transactions"));
  return (
    <Button variant="light" disabled={going}>
      <Icon
        onClick={go}
        variant={
          useSelectedLayoutSegments().includes("transactions")
            ? "shadow"
            : undefined
        }
        tooltip="Transactions"
        size="md"
        icon={going ? Spin : ArrowRightLeft}
      />
    </Button>
  );
};
export default TransactionsRoute;
