"use client";
import { memo, useTransition } from "react";
import Spin from "../../../../_components/loading-spinner";
import { useRouter } from "next/navigation";
import { EditIcon } from "@/app/_components/icons";
import { Button } from "@/components/ui/button";

const EditArea: React.FC<{ id: string }> = memo(({ id }) => {
  const { replace } = useRouter();
  const [isPending, goTo] = useTransition();
  const edit = () => goTo(() => replace(`/admin/areas/${id}`));
  return (
    <Button
      variant="outline"
      size="sm"
      className="w-8 h-8 p-2 rounded-full"
      onClick={edit}
      disabled={isPending}
    >
      {isPending ? (
        <Spin className="w-4 h-4" />
      ) : (
        <EditIcon className="w-4 h-4" />
      )}
    </Button>
  );
});
EditArea.displayName = "EditArea";
export default EditArea;
