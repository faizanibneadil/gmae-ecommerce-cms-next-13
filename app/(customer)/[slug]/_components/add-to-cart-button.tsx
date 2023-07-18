"use client";

import { Button } from "@tremor/react";
import { ShoppingCart } from "lucide-react";

type Props = {};

const AddToCartButton = (props: Props) => {
  return <Button icon={ShoppingCart}>Add To Cart</Button>;
};

export default AddToCartButton;
