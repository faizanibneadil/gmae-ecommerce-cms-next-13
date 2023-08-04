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
  const [isIncrementing, Increment] = useTransition();
  const action = () => Increment(() => addToCart({ productId, userId }));
  return (
    <Icon
      onClick={action}
      icon={isIncrementing ? Spin : Plus}
      variant="solid"
      tooltip="Increment Quantity"
      className="cursor-pointer"
    />
  );
};

export default memo(IncrementToCart);
