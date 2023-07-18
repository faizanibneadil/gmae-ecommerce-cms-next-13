"use client";
import { disconnectSubCategory } from "@/_actions";
import { Button } from "@tremor/react";
import { Unplug } from "lucide-react";
import React, { FC, memo, useTransition } from "react";

type Props = {
  categoryId: string | undefined;
  subCategoryId: string | undefined;
};

const DisconnectButton: FC<Props> = ({ categoryId, subCategoryId }) => {
  const [isPending, startTransition] = useTransition();

  const disconnect = () =>
    startTransition(() => disconnectSubCategory({ categoryId, subCategoryId }));
  return (
    <Button
      onClick={disconnect}
      loading={isPending}
      disabled={isPending}
      size="xs"
      icon={Unplug}
      variant="primary"
      className="pr-0"
    />
  );
};

export default memo(DisconnectButton);
