"use client";
import { Button, Icon } from "@tremor/react";
import { useTransition } from "react";
import Spin from "../../../../_components/loading-spinner";
import { useRouter } from "next/navigation";
import { EditIcon } from "@/app/_components/icons";

export default function EditCategory({ id }: { id: string }) {
  const { replace } = useRouter();
  const [isPending, goTo] = useTransition();
  const edit = () => goTo(() => replace(`/admin/categories/${id}`));
  return (
    <Button variant="light" size="xs" onClick={edit} disabled={isPending}>
      <Icon variant="shadow" size="xs" icon={isPending ? Spin : EditIcon} />
    </Button>
  );
}
