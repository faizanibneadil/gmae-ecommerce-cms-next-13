"use client";
import { connectVariantAction } from "@/_actions";
import { PlugIcon } from "@/app/_components/icons";
import { Button, Icon } from "@tremor/react";
import { useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";

interface Props {
  props: {};
}

const ConnectVariant: React.FC<{
  productId: string;
  variantId: string;
}> = ({ productId, variantId }) => {
  const [connecting, startConnect] = useTransition();
  const connect = () => {
    return startConnect(() => {
      return connectVariantAction({ variantId, productId });
    });
  };
  return (
    <Button onClick={connect} variant="light">
      <Icon
        icon={connecting ? Spin : PlugIcon}
        tooltip="Connect"
        variant="shadow"
        size="xs"
      />
    </Button>
  );
};
export default ConnectVariant;
