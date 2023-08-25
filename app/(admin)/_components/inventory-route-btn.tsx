"use client";

import { Button, Icon } from "@tremor/react";
import { LayoutGrid, Package } from "lucide-react";
import Spin from "@/app/_components/loading-spinner";
import { useTransition } from "react";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";

const InventoryRoute: React.FC<{}> = () => {
  const { push } = useRouter();
  const [going, goto] = useTransition();
  const go = () => goto(() => push("/admin/inventory"));
  return (
    <Button variant="light" disabled={going}>
      <Icon
        onClick={go}
        variant={
          useSelectedLayoutSegments().includes("inventory")
            ? "shadow"
            : undefined
        }
        tooltip="Inventory"
        size="md"
        icon={going ? Spin : Package}
      />
    </Button>
  );
};
export default InventoryRoute;
