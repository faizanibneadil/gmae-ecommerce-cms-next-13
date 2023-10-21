"use client";

import { memo, useEffect } from "react";
import { $Enums } from "@prisma/client";
import SelectSaleMan from "./select-sale-man";
import SelectArea from "./select-area";
import useLoadSheet from "@/store/use-load-sheet";
import { getBillsForLoadSheet } from "../_actions/get-bills";
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

const LoadSheetForm: React.FC<{
  saleMan: TBookers[];
  areas: TAreas[];
}> = memo(({ saleMan, areas }) => {
  const saleManId = useLoadSheet((state) => state.saleManId);
  const areaId = useLoadSheet((state) => state.areaId);
  const setBills = useLoadSheet((state) => state.setBills);
  const setFetching = useLoadSheet((state) => state.setFetching);

  useEffect(() => {
    if (areaId && saleManId) {
      const action = async () => {
        setFetching(true);
        const bills = await getBillsForLoadSheet({ areaId, saleManId });
        setBills(bills);
        setFetching(false);
      };
      action();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
LoadSheetForm.displayName = "LoadSheetForm";
export default LoadSheetForm;
