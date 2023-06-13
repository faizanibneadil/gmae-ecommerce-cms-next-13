"use client";

import { Icon, TextInput } from "@tremor/react";
import { Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductsPageHeader() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between space-x-2">
      <TextInput placeholder="Search Product ..." />
      <Icon icon={Search} variant="solid" tooltip="Search ...">
        Search
      </Icon>
      <Icon
        onClick={() => router.replace("/admin/products/create")}
        icon={Plus}
        variant="solid"
        tooltip="Add New Product."
      >
        Create Product
      </Icon>
    </div>
  );
}
