"use client";

import { Button, Icon } from "@tremor/react";
import { ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";

const GalleryRoute: React.FC<{}> = () => {
  const { push } = useRouter();
  const [going, goto] = useTransition();
  const go = () => goto(() => push("/admin/images"));
  return (
    <Button variant="light" disabled={going}>
      <Icon
        onClick={go}
        variant="shadow"
        tooltip="Image Gallery"
        size="md"
        icon={going ? Spin : ImageIcon}
      />
    </Button>
  );
};
export default GalleryRoute;
