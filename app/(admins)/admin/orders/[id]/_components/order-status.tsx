"use client";
import { memo, useTransition } from "react";
import { $Enums } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { statusAction } from "@/_actions";
import Spin from "@/app/_components/loading-spinner";

const OrderStatus: React.FC<{
  statuses: {
    orders: {
      id: string;
    }[];
    id: string;
    _count: {
      orders: number;
    };
    name: $Enums.OrderStatus;
  }[];
}> = memo(({ statuses }) => {
  const { refresh } = useRouter();
  const orderId = useParams()?.id as string;
  const OpenStatus = statuses.find((s) => s.orders.length > 0)?.name;

  const [pending, start] = useTransition();
  const action = (statusId: string) => {
    return start(() => {
      statusAction({ orderId, statusId });
      refresh();
    });
  };

  const isCompleted =
    OpenStatus === "CANCELLED" ||
    OpenStatus === "RETURNED" ||
    OpenStatus === "DELIVERED";
  return isCompleted ? (
    <div className="flex flex-col items-center justify-center w-40 h-40 border rounded-full">
      <h1 className="mb-2 text-xs">Order Status</h1>
      <Button disabled={isCompleted} variant="outline" size="sm">
        {OpenStatus}
      </Button>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center w-40 h-40 border rounded-full">
      <h1 className="mb-2 text-xs">Order Status</h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            {pending ? <Spin /> : OpenStatus}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" loop>
          <DropdownMenuLabel className="flex items-center justify-between">
            Change Status
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={OpenStatus} onValueChange={action}>
            {statuses.map((s) => (
              <DropdownMenuRadioItem key={s.id} value={s.id}>
                {s.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});
OrderStatus.displayName = "OrderStatus";
export default OrderStatus;
