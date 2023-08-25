"use client";

import {
  connectImageToProductAction,
  disconnectImageToProductAction,
} from "@/_actions";
import { Button } from "@tremor/react";
import { useTransition } from "react";

const DisconnectImage: React.FC<{
  imageId: string;
  productId: string;
}> = ({ imageId, productId }) => {
  const [pending, start] = useTransition();
  const disconnect = () => {
    return start(() => {
      return disconnectImageToProductAction({ imageId, productId });
    });
  };
  return (
    <Button
      onClick={disconnect}
      disabled={pending}
      loading={pending}
      size="xs"
      color="rose"
    >
      {pending ? `` : `Disconnect`}
    </Button>
  );
};
export default DisconnectImage;
