"use client";

import useBilling from "@/store/use-billing";
import { memo, useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";
import { Button } from "@/components/ui/button";
import { saveBill } from "../_actions/save-bill";

type BillItem = {
  title: string | null;
  images: {
    src: string | null;
  }[];
  id: string;
  regularPrice: number | null;
  salePrice: number | null;
  stock: number | null;
  qty?: number | undefined;
};

const SaveBill: React.FC<{}> = memo(() => {
  const [pending, start] = useTransition();
  const isFetching = useBilling((state) => state.isFetching);
  const items = useBilling((state) => state.items) as BillItem[];
  const bookerId = useBilling((state) => state.bookerId);
  const saleManeId = useBilling((state) => state.saleManeId);
  const areaId = useBilling((state) => state.areaId);
  const shopId = useBilling((state) => state.shopId);
  const setShopId = useBilling((state) => state.setShopId);
  const companyId = useBilling((state) => state.companyId);
  const deliveryDate = useBilling((state) => state.deliveryDate);
  const resetQty = useBilling((state) => state.resetQty);
  const setMessage = useBilling((state) => state.setMessage);

  const action = () => {
    return start(async () => {
      const res = await saveBill({
        areaId,
        bookerId,
        companyId,
        deliveryDate,
        items: items.filter((i) => Number(i?.qty) > 0),
        saleManeId,
        shopId,
      });
      console.log(res);
      setMessage(res);
      setShopId("");
      resetQty();
    });
  };

  return (
    <Button onClick={action} type="submit" variant="outline" className="w-full">
      {isFetching || pending ? <Spin /> : `Save`}
    </Button>
  );
});
SaveBill.displayName = "SaveBill";
export default SaveBill;
