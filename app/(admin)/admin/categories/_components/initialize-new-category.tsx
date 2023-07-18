"use client";
import { initializeNewCategory } from "@/_actions";
import { Button } from "@tremor/react";
import { Plus } from "lucide-react";
import { useTransition } from "react";

export default function InitializeNewCategory() {
  const [isPending, startTransition] = useTransition();
  const initialize = () => startTransition(() => initializeNewCategory());
  return (
    <Button
      loading={isPending}
      onClick={() => initialize()}
      variant="primary"
      icon={Plus}
      className="w-full"
    >
      <span className="hidden md:block">Create Category</span>
    </Button>
  );
}
