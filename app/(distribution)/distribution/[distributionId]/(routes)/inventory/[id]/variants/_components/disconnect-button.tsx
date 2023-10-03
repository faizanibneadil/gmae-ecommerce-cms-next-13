"use client";
import { disconnectVariantAction } from "@/_actions";
import { UnPlugIcon } from "@/app/_components/icons";
import { useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Unlink } from "lucide-react";

const DisconnectVariant: React.FC<{
  productId: string;
  variantId: string;
}> = ({ productId, variantId }) => {
  const { refresh } = useRouter();
  const [disConnecting, startDisconnect] = useTransition();
  const connect = () => {
    return startDisconnect(() => {
      disconnectVariantAction({ variantId, productId });
      return refresh();
    });
  };
  return (
    <Button onClick={connect} variant="destructive">
      {disConnecting ? (
        <Spin className="w-4 h-6 mr-1" />
      ) : (
        <span className="flex flex-row items-center">
          <Unlink className="w-4 h-4 mr-1" /> Unlink
        </span>
      )}
    </Button>
  );
};
export default DisconnectVariant;
