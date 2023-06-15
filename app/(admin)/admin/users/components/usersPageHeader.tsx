"use client";

import { Icon, TextInput } from "@tremor/react";
import { Plus, Search } from "lucide-react";

export default function UsersPageHeader() {
  return (
    <div className="flex items-center justify-between space-x-2">
      <TextInput placeholder="Search Users ..." />
      <Icon icon={Search} variant="solid" tooltip="Search ...">
        Search
      </Icon>
      <Icon
        icon={Plus}
        variant="solid"
        tooltip="Add New Users."
      >
        Create User
      </Icon>
    </div>
  );
}
