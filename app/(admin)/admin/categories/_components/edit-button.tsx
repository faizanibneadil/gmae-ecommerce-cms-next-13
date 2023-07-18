'use client'
import { Button } from "@tremor/react";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC, memo, useTransition } from "react";

type Props = {
  categoryId: string | undefined;
};

const EditButton: FC<Props> = ({ categoryId }) => {
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      onClick={() =>
        startTransition(() => replace(`/admin/categories?id=${categoryId}`))
      }
      loading={isPending}
      disabled={isPending}
      size="xs"
      icon={Edit}
      variant="primary"
      className="pr-0"
    />
  );
};

export default memo(EditButton);
