"use client";

import { Input } from "@/components/ui/input";
import { memo } from "react";

const FindByTransactionId: React.FC<{}> = memo(() => {
  return <Input placeholder="Find By ID" />;
});
FindByTransactionId.displayName = "FindByTransactionId";
export default FindByTransactionId;
