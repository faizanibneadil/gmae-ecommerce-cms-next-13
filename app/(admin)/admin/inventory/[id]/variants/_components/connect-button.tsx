"use client";
import { connectVariantAction } from "@/_actions";
import { PlugIcon } from "@/app/_components/icons";
import { Button, Icon } from "@tremor/react";
import { useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";

interface Props {
  props: {
    productId: string;
    variantId: string;
  };
}

const ConnectVariant: React.FC<Props> = ({ props }) => {
  const [connecting, startConnect] = useTransition();
  const connect = () => {
    return startConnect(() => {
      return connectVariantAction({
        variantId: props.variantId,
        productId: props.productId,
      });
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
