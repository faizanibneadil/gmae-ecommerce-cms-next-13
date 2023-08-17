"use client";
import { Button, Icon } from "@tremor/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";
import { MoveLeft } from "lucide-react";

const GoBack: React.FC<{}> = () => {
  const { replace } = useRouter();
  const [going, goto] = useTransition();
  const goBack = () => goto(() => replace("/admin/inventory"));
  return (
    <Button variant="light" disabled={going} onClick={goBack}>
      <Icon variant="shadow" icon={going ? Spin : MoveLeft} />
    </Button>
  );
};
export default GoBack;
