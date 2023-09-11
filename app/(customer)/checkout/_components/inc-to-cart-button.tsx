"use client";
import { addToCart } from "@/_actions";
import { Icon } from "@tremor/react";
import { Plus } from "lucide-react";
import { FC, memo, useTransition } from "react";
import Spin from "../../../_components/loading-spinner";

interface Props {
  productId: string | undefined;
  userId: string | undefined;
}

const IncrementToCart: FC<Props> = ({ productId, userId }) => {
  const [isIncrementing, increment] = useTransition();
  const action = () => {
    return increment(() => {
      return addToCart({
        productId,
        userId,
      });
    });
  };
  return (
    <Icon
      onClick={action}
      icon={isIncrementing ? Spin : Plus}
      variant="solid"
      size="xs"
      tooltip="Increment Quantity"
      className="cursor-pointer"
    />
  );
};

export default memo(IncrementToCart);
