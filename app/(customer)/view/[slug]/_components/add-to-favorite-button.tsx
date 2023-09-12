"use client";

import { Button } from "@tremor/react";
import { Heart } from "lucide-react";
import Spin from "@/app/_components/loading-spinner";
import { memo, useTransition } from "react";
import { addToFavorite } from "@/_actions";

const AddToFavoriteButton: React.FC<{
  productId: string | undefined;
  userId: string | undefined;
}> = memo(({ productId, userId }) => {
  const [adding, startAdd] = useTransition();
  const favorite = () => startAdd(() => addToFavorite({ productId, userId }));
  return (
    <Button onClick={favorite} loading={adding} disabled={adding} icon={Heart}>
      Add To Favorite
    </Button>
  );
});
AddToFavoriteButton.displayName = "AddToFavoriteButton";
export default AddToFavoriteButton;
