"use client";
import { deleteProductAction } from "@/_actions";
import { Button } from "@tremor/react";
import { Trash } from "lucide-react";
import { useTransition } from "react";

export default function DeleteButton({ id }: { id: string }) {
  const [isPending, startDeleting] = useTransition();
  async function deleteCategory(id: string) {
    startDeleting(async () => await deleteProductAction(id));
  }
  return (
    <Button
      size="xs"
      className="w-full"
      variant="secondary"
      icon={Trash}
      loading={isPending}
      disabled={isPending}
      onClick={() => deleteCategory(id)}
    >
      Delete
    </Button>
  );
}
