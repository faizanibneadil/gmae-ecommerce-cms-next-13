"use client";
import { Button } from "@tremor/react";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, memo, useTransition } from "react";

interface Props {
  id: string;
}
const EditButton: FC<Props> = ({ id }) => {
  const router = useRouter();
  const [isPending, startOpen] = useTransition();
  return (
    <Button
      size="xs"
      className="w-full"
      variant="secondary"
      icon={Edit}
      loading={isPending}
      disabled={isPending}
      onClick={() => startOpen(() => router.replace(`/admin/inventory/${id}`))}
    >
      Edit
    </Button>
  );
};
export default memo(EditButton);
