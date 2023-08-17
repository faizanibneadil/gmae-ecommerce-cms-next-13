"use client";
import { deleteCategoryByIdAction } from "@/_actions";
import { Button, Icon } from "@tremor/react";
import { Trash } from "lucide-react";
import { useTransition } from "react";
import Spin from "../../../../_components/loading-spinner";

export default function DeleteCategory({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const deleteCat = () => startTransition(() => deleteCategoryByIdAction(id));
  return (
    <Button variant="light" size="xs" onClick={deleteCat} disabled={isPending}>
      <Icon
        color="rose"
        size="xs"
        variant="simple"
        className="p-0"
        icon={isPending ? Spin : Trash}
      />
    </Button>
  );
}
