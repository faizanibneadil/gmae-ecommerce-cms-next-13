"use client";
import { deleteProductAction } from "@/_actions";
import { Button, Icon } from "@tremor/react";
import { Trash } from "lucide-react";
import { useTransition } from "react";
import Spin from "../../../../_components/loading-spinner";

export default function DeleteProduct({ id }: { id: string }) {
  const [isPending, startDeleting] = useTransition();
  const deleteProduct = () => {
    return startDeleting(async () => await deleteProductAction(id));
  };

  return (
    <Button
      variant="light"
      size="xs"
      onClick={deleteProduct}
      disabled={isPending}
    >
      <Icon
        color="rose"
        size="xs"
        className="p-0"
        variant="simple"
        icon={isPending ? Spin : Trash}
      />
    </Button>
  );
}
