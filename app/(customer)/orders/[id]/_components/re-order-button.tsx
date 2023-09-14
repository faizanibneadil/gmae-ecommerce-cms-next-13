"use client";

import { Button } from "@/components/ui/button";
import { memo } from "react";

const ReOrderButton: React.FC<{}> = memo(() => {
  return (
    <Button onClick={() => alert("ReOrder This Order")} className="w-full mt-4">
      Re Order
    </Button>
  );
});
ReOrderButton.displayName = "ReOrderButton";
export default ReOrderButton;
