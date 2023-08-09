"use client";
import { disconnectVariantAction } from "@/_actions";
import { UnPlugIcon } from "@/app/_components/icons";
import { Button, Icon } from "@tremor/react";
import { useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";
import { useRouter } from "next/navigation";

interface Props {
  props: {
    productId: string;
    variantId: string;
  };
}

const DisconnectVariant: React.FC<Props> = ({ props }) => {
  const { refresh } = useRouter();
  const [disConnecting, startDisconnect] = useTransition();
  const connect = () => {
    return startDisconnect(() => {
      disconnectVariantAction({
        variantId: props.variantId,
        productId: props.productId,
      });
      return refresh();
    });
  };
  return (
    <Button onClick={connect} variant="light">
      <Icon
        icon={disConnecting ? Spin : UnPlugIcon}
        tooltip="Disconnect"
        variant="shadow"
        size="xs"
      />
    </Button>
  );
};
export default DisconnectVariant;
