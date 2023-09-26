"use client";

import { Button } from "@/components/ui/button";
import { memo, useTransition } from "react";
import { saveBill } from "../_actions/save-bill";
import { useParams } from "next/navigation";
import useSaleReturn from "@/store/use-sale-return";
import Spin from "@/app/_components/loading-spinner";

const SaveBill: React.FC<{
  isReturned: boolean | undefined;
}> = memo(({ isReturned }) => {
  const billId = useParams()?.id as string;
  const items = useSaleReturn((state) => state.items);
  const setMessages = useSaleReturn((state) => state.setMessages);
  const [pending, start] = useTransition();
  const action = () => {
    return start(async () => {
      const res = await saveBill({
        billId,
        items: items?.filter((i) => Number(i.qty) > 0),
      });
      setMessages(res);
    });
  };
  return (
    <Button
      disabled={pending || isReturned}
      onClick={action}
      className="w-full"
      variant="outline"
    >
      {pending ? <Spin /> : `Save`}
    </Button>
  );
});
SaveBill.displayName = "SaveBill";
export default SaveBill;
