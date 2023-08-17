"use client";

import { initImage } from "@/_actions";
import { Button, Icon } from "@tremor/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";
import { PlusIcon } from "@/app/_components/icons";

const InitImage: React.FC<{}> = () => {
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const initialize = () => {
    return startTransition(async () => {
      const id = await initImage();
      return replace(`/admin/images/${id}`);
    });
  };

  return (
    <Button variant="light" onClick={initialize} disabled={isPending}>
      <Icon variant="shadow" icon={isPending ? Spin : PlusIcon} />
    </Button>
  );
};

export default InitImage;
