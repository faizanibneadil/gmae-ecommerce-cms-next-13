"use client";
import { initializeNewCategory } from "@/_actions";
import { Button, Icon } from "@tremor/react";
import { Plus } from "lucide-react";
import { useTransition } from "react";
import Spin from "../../../../_components/loading-spinner";
import { useRouter } from "next/navigation";

export default function InitializeNewCategory() {
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const initialize = () => {
    return startTransition(async () => {
      const id = await initializeNewCategory();
      return replace(`/admin/categories/${id}`);
    });
  };

  return (
    <Button variant="light" onClick={initialize} disabled={isPending}>
      <Icon variant="shadow" icon={isPending ? Spin : Plus} />
    </Button>
  );
}
