"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";
import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const GoBack: React.FC<{}> = () => {
  const { replace } = useRouter();
  const [going, goto] = useTransition();
  const goBack = () => goto(() => replace("/admin/images"));
  return (
    <Button disabled={going} onClick={goBack}>
      {going ? <Spin /> : <MoveLeft />}
    </Button>
  );
};
export default GoBack;
