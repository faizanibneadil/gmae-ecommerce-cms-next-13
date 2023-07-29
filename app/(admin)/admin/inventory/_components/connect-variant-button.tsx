"use client";

import { connectVariantAction } from "@/_actions";
import { Button } from "@tremor/react";
import React, { FC, memo, useTransition } from "react";

interface Props {
  variantId: string;
  productId?: string;
}

const ConnectVariantButton: FC<Props> = ({ variantId, productId }) => {
  const [isPending, startTransition] = useTransition();
  const action = () =>
    startTransition(() => connectVariantAction({ variantId, productId }));
  return (
    <Button loading={isPending} disabled={isPending} onClick={action}>
      Connect
    </Button>
  );
};

export default memo(ConnectVariantButton);
