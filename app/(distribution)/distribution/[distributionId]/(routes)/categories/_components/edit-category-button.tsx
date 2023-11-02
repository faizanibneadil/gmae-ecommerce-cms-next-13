"use client";
import { memo, useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";
import { useParams, useRouter } from "next/navigation";
import { EditIcon } from "@/app/_components/icons";
import { Button } from "@/components/ui/button";

const EditCategory: React.FC<{ id: string }> = memo(({ id }) => {
  const { replace } = useRouter();
  const distributionId = useParams()?.distributionId as string;
  const [isPending, goTo] = useTransition();
  const edit = () =>
    goTo(() => replace(`/distribution/${distributionId}/categories/${id}`));
  return (
    <Button variant="outline" size="sm" onClick={edit} disabled={isPending}>
      {isPending ? (
        <Spin className="w-4 h-4" />
      ) : (
        <EditIcon className="w-4 h-4" />
      )}
    </Button>
  );
});
EditCategory.displayName = "EditCategory";
export default EditCategory;
