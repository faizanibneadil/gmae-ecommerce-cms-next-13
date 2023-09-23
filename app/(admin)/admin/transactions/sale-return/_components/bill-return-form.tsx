"use client";

import { memo, useEffect } from "react";
import { $Enums } from "@prisma/client";
import SelectSaleMan from "./select-sale-man";
import SelectArea from "./select-area";
// import SaveBill from "./save-bill";
import useBilling from "@/store/use-billing";
import { Badge } from "@/components/ui/badge";
import useSaleReturn from "@/store/use-sale-return";
import { updateBill } from "../_actions/sale-return";
import Bills from "./bills";

type TBookers = {
  id: string;
  name: string | null;
  role: $Enums.Role | null;
};

type TAreas = {
  id: string;
  name: string | null;
};

const BillReturnForm: React.FC<{
  saleMan: TBookers[];
  areas: TAreas[];
}> = memo(({ saleMan, areas }) => {
  const saleManId = useSaleReturn((state) => state.saleManId);
  const areaId = useSaleReturn((state) => state.areaId);
  const setBills = useSaleReturn((state) => state.setBills);
  const setFetching = useSaleReturn((state) => state.setFetching);
  useEffect(() => {
    if (areaId && saleManId) {
      const action = async () => {
        setFetching(true);
        const bills = await updateBill({ areaId, saleManId });
        setBills(bills);
        setFetching(false);
      };
      action();
    }
  }, [saleManId, areaId]);
  return (
    <div className="space-y-2">
      <div className="grid content-center grid-cols-1 gap-x-1 gap-y-1 md:grid-cols-2">
        <SelectSaleMan saleMan={saleMan} />
        <SelectArea areas={areas} />
      </div>
      <Bills />
      {/* <SaveBill /> */}
    </div>
  );
});
BillReturnForm.displayName = "BillReturnForm";
export default BillReturnForm;
