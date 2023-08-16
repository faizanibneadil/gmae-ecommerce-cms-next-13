"use client";

import { Button, Icon } from "@tremor/react";
import { Users2 } from "lucide-react";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";

const CustomersRoute: React.FC<{}> = () => {
  const { push } = useRouter();
  const [going, goto] = useTransition();
  const go = () => goto(() => push("/admin/customers"));
  return (
    <Button variant="light" disabled={going}>
      <Icon
        onClick={go}
        variant={
          useSelectedLayoutSegments().includes("customers")
            ? "shadow"
            : undefined
        }
        tooltip="Customers"
        size="md"
        icon={going ? Spin : Users2}
      />
    </Button>
  );
};
export default CustomersRoute;
