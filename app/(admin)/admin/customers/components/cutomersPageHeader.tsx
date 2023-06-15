"use client";

import { Icon, TextInput } from "@tremor/react";
import { Plus, Search } from "lucide-react";

export default function CustomersPageHeader() {
  return (
    <div className="flex items-center justify-between space-x-2">
      <TextInput placeholder="Search Customers ..." />
      <Icon icon={Search} variant="solid" tooltip="Search ...">
        Search
      </Icon>
      <Icon
        icon={Plus}
        variant="solid"
        tooltip="Add New Customers."
      >
        Create Product
      </Icon>
    </div>
  );
}
