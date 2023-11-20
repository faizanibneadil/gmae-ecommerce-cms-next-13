"use client";

import { Button } from "@/components/ui/button";
import { memo, useTransition } from "react";
import { useParams } from "next/navigation";
import Spin from "@/app/_components/loading-spinner";
import { cancelBill } from "../_actions/cancel-bill";

const CancelBill: React.FC<{}> = memo(({}) => {
  const billId = useParams()?.id as string;
  const [pending, start] = useTransition();

  return (
    <Button
      disabled={pending}
      onClick={() => start(() => cancelBill({ billId }))}
      className={`w-full ${pending && "cursor-not-allowed"}`}
      variant="destructive"
      type="button"
    >
      {pending ? "..." : `Cancel Bill`}
    </Button>
  );
});
CancelBill.displayName = "CancelBill";
export default CancelBill;
