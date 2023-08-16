"use client";

import { Button, Icon } from "@tremor/react";
import { Settings } from "lucide-react";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { useTransition } from "react";
import Spin from "@/app/_components/loading-spinner"

const SettingsRoute: React.FC<{}> = () => {
  const { push } = useRouter();
  const [going, goto] = useTransition();
  const go = () => goto(() => push("/admin/settings"));
  return (
    <Button variant="light" disabled={going}>
      <Icon
        onClick={go}
        variant={
          useSelectedLayoutSegments().includes("settings")
            ? "shadow"
            : undefined
        }
        tooltip="Settings"
        size="md"
        icon={going ? Spin : Settings}
      />
    </Button>
  );
};
export default SettingsRoute;
