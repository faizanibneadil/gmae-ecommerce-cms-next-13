"use client";

import { Heart } from "lucide-react";
import Spin from "@/app/_components/loading-spinner";
import { memo, useTransition } from "react";
import { addToFavorite } from "@/_actions";
import { Button } from "@/components/ui/button";

const AddToFavoriteButton: React.FC<{
  productId: string | undefined;
  userId: string | undefined;
}> = memo(({ productId, userId }) => {
  const [adding, startAdd] = useTransition();
  const favorite = () => startAdd(() => addToFavorite({ productId, userId }));
  return (
    <Button onClick={favorite} disabled={adding}>
      {adding ? (
        <div className="flex items-center justify-center">
          <Spin className="mr-2" />
          <span>Add To Favorite</span>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <Heart className="mr-2" />
          <span>Add To Favorite</span>
        </div>
      )}
    </Button>
  );
});
AddToFavoriteButton.displayName = "AddToFavoriteButton";
export default AddToFavoriteButton;
