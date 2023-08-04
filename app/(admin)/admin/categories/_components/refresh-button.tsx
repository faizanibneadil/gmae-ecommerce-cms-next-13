"use client";
import { RefreshIcon } from "@/app/_components/icons";
import { Button, Icon } from "@tremor/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Spin from "../../../../_components/loading-spinner";

const RefreshPage: React.FC = () => {
  const { refresh } = useRouter();
  const [refreshing, fresh] = useTransition();
  const hardRefresh = () => fresh(() => refresh());
  return (
    <Button variant="light" disabled={refreshing} onClick={hardRefresh}>
      <Icon variant="shadow" icon={refreshing ? Spin : RefreshIcon} />
    </Button>
  );
};
export default RefreshPage;
