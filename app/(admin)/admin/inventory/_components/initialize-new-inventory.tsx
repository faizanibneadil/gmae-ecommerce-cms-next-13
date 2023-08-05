"use client";
import { initializeNewInventory } from "@/_actions";
import { Button, Icon } from "@tremor/react";
import { Plus } from "lucide-react";
import { useTransition } from "react";
import Spin from "../../../../_components/loading-spinner";
import { useRouter } from "next/navigation";

export default function InitializeNewInventory() {
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const initialize = () => {
    return startTransition(async () => {
      const id = await initializeNewInventory();
      return replace(`/admin/inventory/${id}`);
    });
  };

  return (
    <Button variant="light" onClick={initialize} disabled={isPending}>
      <Icon variant="shadow" icon={isPending ? Spin : Plus} />
    </Button>
  );
}
