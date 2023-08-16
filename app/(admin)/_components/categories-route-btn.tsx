"use client";

import { Button, Icon } from "@tremor/react";
import { List } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";

const CategoriesRoute: React.FC<{}> = () => {
  const { push } = useRouter();
  const [going, goto] = useTransition();
  const go = () => goto(() => push("/admin/categories"));
  return (
    <Button variant="light" disabled={going}>
      <Icon
        onClick={go}
        variant="shadow"
        tooltip="Categories"
        size="md"
        icon={going ? Spin : List}
      />
    </Button>
  );
};
export default CategoriesRoute;
