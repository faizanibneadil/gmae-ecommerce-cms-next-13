"use client";
import { EditIcon } from "@/app/_components/icons";
import { Button, Icon } from "@tremor/react";
import { useRouter } from "next/navigation";
import { memo, useTransition } from "react";
import Spin from "../../../../_components/loading-spinner";

interface Props {
  id: string;
}
const EditProduct: React.FC<Props> = ({ id }) => {
  const router = useRouter();
  const [isPending, startOpen] = useTransition();
  const edit = () => startOpen(() => router.replace(`/admin/inventory/${id}`));
  return (
    <Button variant="light" size="xs" onClick={edit} disabled={isPending}>
      <Icon variant="shadow" size="xs" icon={isPending ? Spin : EditIcon} />
    </Button>
  );
};
export default memo(EditProduct);
