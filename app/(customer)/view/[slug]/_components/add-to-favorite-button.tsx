"use client";

import { Button } from "@tremor/react";
import { Heart } from "lucide-react";

type Props = {};

const AddToFavoriteButton = (props: Props) => {
  return <Button icon={Heart}>Add To Favorite</Button>;
};

export default AddToFavoriteButton;
