"use client";
import { Icon } from "@tremor/react";
import { Minus } from "lucide-react";
import { FC, memo } from "react";

interface Props {}

const DecrementToCart: FC<Props> = () => {
  return <Icon icon={Minus} variant="solid" tooltip="Decrement Quantity" />;
};

export default memo(DecrementToCart);
