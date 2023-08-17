"use client";
import { decrementToCart } from "@/_actions";
import { Icon } from "@tremor/react";
import { Minus } from "lucide-react";
import { FC, memo, useTransition } from "react";
import Spin from "../../../_components/loading-spinner";

interface Props {
  productId: string | undefined;
  userId: string | undefined;
}

interface Props {}

const DecrementToCart: FC<Props> = ({ productId, userId }) => {
  const [isDecrementing, decrement] = useTransition();
  const action = () => {
    return decrement(() => {
      return decrementToCart({
        productId,
        userId,
      });
    });
  };
  return (
    <Icon
      onClick={action}
      icon={isDecrementing ? Spin : Minus}
      variant="solid"
      size="xs"
      tooltip="Decrement Quantity"
      className="cursor-pointer"
    />
  );
};

export default memo(DecrementToCart);
