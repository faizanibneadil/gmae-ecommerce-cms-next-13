"use client";
import { addToCart } from "@/_actions";
import { Icon } from "@tremor/react";
import { Loader, Plus } from "lucide-react";
import { FC, memo, useTransition } from "react";

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
      icon={isIncrementing ? Loader : Plus}
      variant="solid"
      tooltip="Increment Quantity"
    />
  );
};

export default memo(IncrementToCart);
