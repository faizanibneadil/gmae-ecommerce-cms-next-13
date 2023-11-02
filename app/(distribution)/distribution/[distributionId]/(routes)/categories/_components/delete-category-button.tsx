"use client";
import { deleteCategoryByIdAction } from "@/_actions";
import { Trash } from "lucide-react";
import { useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";
import { Button } from "@/components/ui/button";

export default function DeleteCategory({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const deleteCat = () => startTransition(() => deleteCategoryByIdAction(id));
  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={deleteCat}
      disabled={isPending}
    >
      {isPending ? <Spin /> : <Trash />}
    </Button>
  );
}
