"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { memo, useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";
import { $Enums } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Filter } from "lucide-react";

const OrderFilter: React.FC<{
  statuses: ({
    _count: {
      orders: number;
    };
  } & {
    id: string;
    name: $Enums.OrderStatus;
  })[];
  OpenStatus: string | undefined;
}> = memo(({ statuses, OpenStatus }) => {
  const { replace } = useRouter();
  const CurrantStatus = statuses.find((s) => s.id === OpenStatus)?.name;
  const CurrantStatusId = statuses.find((s) => s.id === OpenStatus)?.id;
  const totalOrders = statuses.find((s) => s.id === OpenStatus)?._count.orders;
  const [pending, start] = useTransition();
  const action = (id: string) => {
    return start(() => replace(`/admin/orders?statusId=${id}`));
  };
  return (
    <div className="flex flex-row items-center justify-between pb-2 border-b">
      <h1 className="font-semibold">
        {CurrantStatus} - {totalOrders}
      </h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            {pending ? (
              <Spin />
            ) : (
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </div>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" loop>
          <DropdownMenuLabel className="flex items-center justify-between">
            Change Status
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={CurrantStatusId}
            onValueChange={action}
          >
            {statuses?.map((s: any) => (
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
OrderFilter.displayName = "OrderFilter";
export default OrderFilter;
