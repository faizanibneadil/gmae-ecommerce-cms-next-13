"use client";

import { Button } from "@/components/ui/button";
import { memo, useTransition } from "react";
import { saveBill } from "../_actions/save-bill";
import { useParams } from "next/navigation";
import useSaleReturn from "@/store/use-sale-return";
import Spin from "@/app/_components/loading-spinner";
import { cancelBill } from "../_actions/cancel-bill";

const CancelBill: React.FC<{}> = memo(({}) => {
  const billId = useParams()?.id as string;
  const distributorId = useParams()?.distributorId as string;
  const [pending, start] = useTransition();
  //  @ts-ignore
  const action = () => start(() => cancelBill({ billId, distributorId }));
  return (
    <Button
      disabled={pending}
      onClick={action}
      className="w-full"
      variant="destructive"
    >
      {pending ? <Spin /> : `Cancel Bill`}
    </Button>
  );
});
CancelBill.displayName = "CancelBill";
export default CancelBill;
