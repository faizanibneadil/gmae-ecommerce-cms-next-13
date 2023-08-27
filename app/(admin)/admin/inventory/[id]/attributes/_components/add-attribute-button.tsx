"use client";

import { initAttribute } from "@/_actions";
import { Button, Card } from "@tremor/react";
import { useParams, useRouter } from "next/navigation";
import { memo, useTransition } from "react";

const NewAttribute: React.FC<{}> = memo(() => {
  const { refresh } = useRouter();
  const productId = useParams()?.id as string;
  const [initializing, startInit] = useTransition();
  const init = () => {
    return startInit(async () => {
      await initAttribute({ productId });
      refresh();
    });
  };
  return (
    <Button variant="light" disabled={initializing} onClick={init}>
      <Card className="flex items-center justify-center w-full h-20">
        {initializing ? `Adding ...` : `Add New Attribute`}
      </Card>
    </Button>
  );
});
NewAttribute.displayName = "NewAttribute";
export default NewAttribute;
