"use client";

import { Button } from "@tremor/react";
import { ShoppingBag } from "lucide-react";

type Props = {};

const BuyNowButton = (props: Props) => {
  return <Button icon={ShoppingBag}>Buy Now</Button>;
};

export default BuyNowButton;
