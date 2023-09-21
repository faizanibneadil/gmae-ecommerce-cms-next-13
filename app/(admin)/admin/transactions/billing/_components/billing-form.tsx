"use client";

import { memo } from "react";
import { $Enums } from "@prisma/client";
import SelectBooker from "./select-booker";
import SelectSaleMan from "./select-sale-mane";
import SelectArea from "./select-area";
import SelectShop from "./select-shops";
import SelectCompany from "./select-company";
import SelectDeliveryDate from "./select-delivery-date";
import BillingProducts from "./billing-products";
import SaveBill from "./save-bill";

type TUsers = {
  id: string;
  name: string | null;
  role: $Enums.Role | null;
};

type TCompanies = {
  id: string;
  name: string | null;
};

type TAreas = {
  id: string;
  name: string | null;
};

const BillingForm: React.FC<{
  users: TUsers[];
  companies: TCompanies[];
  areas: TAreas[];
}> = memo(({ users, companies, areas }) => {
  const bookers = users.filter((u) => u.role === "BOOKER");
  const salesMans = users.filter((u) => u.role === "SALES_MAN");
  return (
    <div className="space-y-2">
      <div className="grid content-center grid-cols-1 gap-x-1 gap-y-1 md:grid-cols-2">
        <SelectBooker bookers={bookers} />
        <SelectSaleMan saleManes={salesMans} />
        <SelectArea areas={areas} />
        <SelectShop />
        <SelectCompany companies={companies} />
        <SelectDeliveryDate />
      </div>
      <BillingProducts />
      <SaveBill />
    </div>
  );
});
BillingForm.displayName = "BillingForm";
export default BillingForm;
