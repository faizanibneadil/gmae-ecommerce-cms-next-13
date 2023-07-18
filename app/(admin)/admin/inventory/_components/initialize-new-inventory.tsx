"use client";
import { initializeNewInventory } from "@/_actions";
import { Button } from "@tremor/react";
import { Plus } from "lucide-react";
import { useTransition } from "react";

export default function InitializeNewInventory() {
  const [isPending, startTransition] = useTransition();
  const initialize = () => startTransition(() => initializeNewInventory());
  return (
    <Button
      loading={isPending}
      onClick={() => initialize()}
      variant="primary"
      icon={Plus}
      className="pr-1.5 md:pr-2.5"
    >
      <span className="hidden md:block">Create Inventory</span>
    </Button>
  );
}
