"use client";

import { memo, useEffect, useState, useTransition } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Spin from "@/app/_components/loading-spinner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { $Enums } from "@prisma/client";
import { v4 as uuidV4 } from "uuid";
import { format, addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

import { getShopsByAreaId } from "../_actions/get-shops-by-area-id";
import { getProductsByCompanyId } from "../_actions/get-products-by-company-id";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { MinusIcon, PlusIcon } from "@/app/_components/icons";
import SelectBooker from "./select-booker";
import SelectSaleMan from "./select-sale-mane";
import SelectArea from "./select-area";
import SelectShop from "./select-shops";
import SelectCompany from "./select-company";
import SelectDeliveryDate from "./select-delivery-date";
import useBilling from "@/store/use-billing";
import BillingProducts from "./billing-products";

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
  const isFetching = useBilling((state) => state.isFetching);
  const items = useBilling((state) => state.items);
  console.log(items);
  return (
    <div className="space-y-2">
      <div className="grid content-center grid-cols-1 gap-x-1 gap-y-1 md:grid-cols-3">
        <SelectBooker bookers={bookers} />
        <SelectSaleMan saleManes={salesMans} />
        <SelectArea areas={areas} />
        <SelectShop />
        <SelectCompany companies={companies} />
        <SelectDeliveryDate />
        {/* Delivery Date input  */}
      </div>
      <BillingProducts />

      <Button type="submit" variant="outline" className="w-full">
        {isFetching ? <Spin /> : `Save`}
      </Button>
    </div>
  );
});
BillingForm.displayName = "BillingForm";
export default BillingForm;
