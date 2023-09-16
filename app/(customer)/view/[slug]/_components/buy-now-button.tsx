"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

type Props = {};

const BuyNowButton = (props: Props) => {
  return (
    <Button className="flex items-center justify-center">
      <ShoppingBag className="mr-2" />
      <span>Buy Now</span>
    </Button>
  );
};

export default BuyNowButton;
