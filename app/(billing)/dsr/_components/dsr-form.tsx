"use client";

import { memo, useEffect } from "react";
import { $Enums } from "@prisma/client";
import SelectSaleMan from "./select-sale-man";
import SelectArea from "./select-area";
import useDSR from "@/store/use-dsr";
import { getBillsForDSR } from "../_actions/get-bills";
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

const DSRForm: React.FC<{
  saleMan: TBookers[];
  areas: TAreas[];
}> = memo(({ saleMan, areas }) => {
  const saleManId = useDSR((state) => state.saleManId);
  const areaId = useDSR((state) => state.areaId);
  const setBills = useDSR((state) => state.setBills);
  const setFetching = useDSR((state) => state.setFetching);

  useEffect(() => {
    if (areaId && saleManId) {
      const action = async () => {
        setFetching(true);
        const bills = await getBillsForDSR({ areaId, saleManId });
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
DSRForm.displayName = "DSRForm";
export default DSRForm;
