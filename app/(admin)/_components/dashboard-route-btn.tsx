"use client";

import { Button, Icon } from "@tremor/react";
import { Gauge } from "lucide-react";
import {
  useRouter,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";
import { useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";

const DashboardRoute: React.FC<{}> = () => {
  const { push } = useRouter();
  const [going, goto] = useTransition();
  const go = () => goto(() => push("/admin"));
  console.log(useSelectedLayoutSegments());
  return (
    <Button variant="light" disabled={going}>
      <Icon
        className="rounded-none"
        onClick={go}
        variant={
          useSelectedLayoutSegments().includes("dashboard")
            ? "shadow"
            : undefined
        }
        tooltip="Dashboard"
        size="md"
        icon={going ? Spin : Gauge}
      />
    </Button>
  );
};
export default DashboardRoute;
