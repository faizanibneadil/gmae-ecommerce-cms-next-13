"use client";

import { Button, Icon } from "@tremor/react";
import { ArrowRightLeft } from "lucide-react";
import { useRouter } from "next/navigation";
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
        variant="shadow"
        tooltip="Transactions"
        size="md"
        icon={going ? Spin : ArrowRightLeft}
      />
    </Button>
  );
};
export default TransactionsRoute;
