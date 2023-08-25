"use client";

import { connectImageToProductAction } from "@/_actions";
import { Button } from "@tremor/react";
import { useTransition } from "react";

const ConnectImage: React.FC<{
  imageId: string;
  productId: string;
}> = ({ imageId, productId }) => {
  const [pending, start] = useTransition();
  const connect = () => {
    return start(() => {
      return connectImageToProductAction({ imageId, productId });
    });
  };
  return (
    <Button
      onClick={connect}
      disabled={pending}
      loading={pending}
      size="xs"
      color="green"
    >
      {pending ? `` : `Connect`}
    </Button>
  );
};
export default ConnectImage;
