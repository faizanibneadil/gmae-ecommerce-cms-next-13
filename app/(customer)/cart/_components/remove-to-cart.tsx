"use client";
import { Icon } from "@tremor/react";
import { X } from "lucide-react";
import { FC, memo } from "react";

interface Props {}

const RemoveToCart: FC<Props> = () => {
  return (
    <Icon icon={X} variant="solid" color="rose" tooltip="Remove To Cart" />
  );
};

export default memo(RemoveToCart);
