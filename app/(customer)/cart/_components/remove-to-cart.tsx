"use client";
import { Icon } from "@tremor/react";
import { X } from "lucide-react";
import { FC, memo, useTransition } from "react";
import Spin from "../../../_components/loading-spinner";
import { removeToCart } from "@/_actions";

interface Props {
  productId: string | undefined;
  userId: string | undefined;
}

const RemoveToCart: FC<Props> = ({ productId, userId }) => {
  const [isDecrementing, decrement] = useTransition();
  const action = () => {
    return decrement(() => {
      return removeToCart({
        productId,
        userId,
      });
    });
  };
  return (
    <Icon
      onClick={action}
      icon={isDecrementing ? Spin : X}
      variant="solid"
      className="cursor-pointer"
      color="rose"
      tooltip="Remove To Cart"
    />
  );
};

export default memo(RemoveToCart);
