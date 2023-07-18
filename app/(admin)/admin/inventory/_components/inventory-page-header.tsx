"use client";

import { Button, Icon, TextInput } from "@tremor/react";
import { Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import InitializeNewInventory from "./initialize-new-inventory";

export default function InventoryPageHeader() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between space-x-2">
      <TextInput placeholder="Search Product ..." />
      <Icon icon={Search} variant="solid" tooltip="Search ...">
        Search
      </Icon>
      <InitializeNewInventory />
    </div>
  );
}
