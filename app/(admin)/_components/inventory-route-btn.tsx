"use client";

import { Button, Icon } from "@tremor/react";
import { LayoutGrid } from "lucide-react";
import Spin from "@/app/_components/loading-spinner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

const InventoryRoute: React.FC<{}> = () => {
  const { push } = useRouter();
  const [going, goto] = useTransition();
  const go = () => goto(() => push("/admin/inventory"));
  return (
    <Button variant="light" disabled={going}>
      <Icon
        onClick={go}
        variant="shadow"
        tooltip="Inventory"
        size="md"
        icon={going ? Spin : LayoutGrid}
      />
    </Button>
  );
};
export default InventoryRoute;
