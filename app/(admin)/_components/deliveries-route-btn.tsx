"use client";

import { Button, Icon } from "@tremor/react";
import { Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";
import { useSelectedLayoutSegments } from "next/navigation";

const DeliveriesRoute: React.FC<{}> = () => {
  const { push } = useRouter();
  const [going, goto] = useTransition();
  const go = () => goto(() => push("/admin/deliveries"));
  return (
    <Button variant="light" disabled={going}>
      <Icon
        onClick={go}
        variant={
          useSelectedLayoutSegments().includes("deliveries")
            ? "shadow"
            : undefined
        }
        tooltip="Deliveries"
        size="md"
        icon={going ? Spin : Truck}
      />
    </Button>
  );
};
export default DeliveriesRoute;