"use client";

import { Button, Icon } from "@tremor/react";
import { Gauge } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";

const DashboardRoute: React.FC<{}> = () => {
  const { push } = useRouter();
  const [going, goto] = useTransition();
  const go = () => goto(() => push("/admin"));
  return (
    <Button variant="light" disabled={going}>
      <Icon
        onClick={go}
        variant="shadow"
        tooltip="Dashboard"
        size="md"
        icon={going ? Spin : Gauge}
      />
    </Button>
  );
};
export default DashboardRoute;
