"use client";

import { Button, Icon } from "@tremor/react";
import { ImageIcon } from "lucide-react";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
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
        variant={
          useSelectedLayoutSegments().includes("images")
            ? "shadow"
            : undefined
        }
        tooltip="Image Gallery"
        size="md"
        icon={going ? Spin : ImageIcon}
      />
    </Button>
  );
};
export default GalleryRoute;
