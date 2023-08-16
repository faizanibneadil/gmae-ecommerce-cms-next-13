"use client";

import { Button, Icon } from "@tremor/react";
import { Users } from "lucide-react";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";

const UsersRoute: React.FC<{}> = () => {
  const { push } = useRouter();
  const [going, goto] = useTransition();
  const go = () => goto(() => push("/admin/users"));
  return (
    <Button variant="light" disabled={going}>
      <Icon
        onClick={go}
        variant={
          useSelectedLayoutSegments().includes("users")
            ? "shadow"
            : undefined
        }
        tooltip="Users"
        size="md"
        icon={going ? Spin : Users}
      />
    </Button>
  );
};
export default UsersRoute;
