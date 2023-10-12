"use client";

import { Button } from "@/components/ui/button";
import { memo, useTransition } from "react";
import { useParams } from "next/navigation";
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
      type="button"
    >
      {pending ? <Spin /> : `Cancel Bill`}
    </Button>
  );
});
CancelBill.displayName = "CancelBill";
export default CancelBill;
