"use client";
import { connectVariantAction } from "@/_actions";
import { PlugIcon } from "@/app/_components/icons";
import { useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";

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
    <Button onClick={connect} variant="outline">
      {connecting ? (
        <Spin className="w-4 h-4" />
      ) : (
        <span className="flex flex-row items-center">
          <Link className="w-4 h-4 mr-1" /> Link
        </span>
      )}
    </Button>
  );
};
export default ConnectVariant;
