"use client";

import { Button, Icon } from "@tremor/react";
import { Percent } from "lucide-react";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";

const CouponsRoute: React.FC<{}> = () => {
  const { push } = useRouter();
  const [going, goto] = useTransition();
  const go = () => goto(() => push("/admin/coupons"));
  return (
    <Button variant="light" disabled={going}>
      <Icon
        onClick={go}
        variant={
          useSelectedLayoutSegments().includes("coupons")
            ? "shadow"
            : undefined
        }
        tooltip="Coupons"
        size="md"
        icon={going ? Spin : Percent}
      />
    </Button>
  );
};
export default CouponsRoute;
