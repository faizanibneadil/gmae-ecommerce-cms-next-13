"use client";

import { Button } from "@/components/ui/button";
import { memo } from "react";

const CancelOrderButton: React.FC<{}> = memo(() => {
  return (
    <Button
      variant="destructive"
      onClick={() => alert("Cancel This Order")}
      className="w-full mt-4"
    >
      Cancel Order
    </Button>
  );
});
CancelOrderButton.displayName = "CancelOrderButton";
export default CancelOrderButton;
