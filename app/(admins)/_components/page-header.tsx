"use client";

import { Button, Icon, Text, Title } from "@tremor/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";
import { MoveLeft } from "lucide-react";

const PageHeader: React.FC<{
  backRoute: string;
  pageHeading: string;
  pageDescription: string;
  enableBackButton: boolean;
}> = ({ backRoute, pageDescription, pageHeading, enableBackButton }) => {
  const router = useRouter();
  const [pending, start] = useTransition();
  const goBack = () => start(() => router.replace(backRoute));
  return (
    <div className="flex items-center justify-between p-2 border-b">
      {enableBackButton && (
        <div className="flex justify-end space-x-2">
          <Button variant="light" disabled={pending} onClick={goBack}>
            <Icon variant="shadow" icon={pending ? Spin : MoveLeft} />
          </Button>
        </div>
      )}
      <div className={enableBackButton ? `text-right` : `text-left`}>
        <Title>{pageHeading}</Title>
        <Text>{pageDescription}</Text>
      </div>
    </div>
  );
};
export default PageHeader;
