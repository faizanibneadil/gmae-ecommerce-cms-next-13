"use client";
import { memo, useTransition } from "react";
import Spin from "../../../../_components/loading-spinner";
import { useRouter } from "next/navigation";
import { EditIcon } from "@/app/_components/icons";
import { Button } from "@/components/ui/button";

const EditAddress: React.FC<{ id: string }> = memo(({ id }) => {
  const { replace } = useRouter();
  const [isPending, goTo] = useTransition();
  const edit = () => goTo(() => replace(`/me/address/${id}`));
  return (
    <Button variant="secondary" size="sm" onClick={edit} disabled={isPending}>
      {isPending ? (
        <Spin className="w-4 h-4" />
      ) : (
        <EditIcon className="w-4 h-4" />
      )}
    </Button>
  );
});
EditAddress.displayName = "EditAddress";
export default EditAddress;
