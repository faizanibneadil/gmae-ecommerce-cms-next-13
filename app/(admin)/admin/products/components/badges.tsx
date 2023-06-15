"use client";

import { Badge } from "@tremor/react";
import { Star } from "lucide-react";

export default function Badges() {
  return (
    <div className="flex items-center gap-2 mt-2">
      <Badge icon={Star} color="orange" size="xs">
        2.5
      </Badge>
    </div>
  );
}
