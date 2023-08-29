"use client";

import { initAttribute } from "@/_actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    <Button variant="outline" disabled={initializing} onClick={init}>
      {initializing ? `Adding ...` : `Add New Attribute`}
    </Button>
  );
});
NewAttribute.displayName = "NewAttribute";
export default NewAttribute;
