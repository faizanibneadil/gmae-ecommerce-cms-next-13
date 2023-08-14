"use client";

import { Button } from "@tremor/react";
import { Heart } from "lucide-react";
import Spin from "@/app/_components/loading-spinner";
import { useTransition } from "react";
import { addToFavorite } from "@/_actions";

type Props = {
  props: {
    productId: string | undefined;
    userId: string | undefined;
  };
};

const AddToFavoriteButton = ({ props }: Props) => {
  const [adding, startAdd] = useTransition();
  const favorite = () => {
    return startAdd(() => {
      return addToFavorite({
        productId: props?.productId,
        userId: props?.userId,
      });
    });
  };
  return (
    <Button onClick={favorite} loading={adding} disabled={adding} icon={Heart}>
      Add To Favorite
    </Button>
  );
};

export default AddToFavoriteButton;
