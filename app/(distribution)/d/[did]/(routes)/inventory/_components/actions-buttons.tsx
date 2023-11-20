"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useParams, useRouter } from "next/navigation";
import { memo, useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";

const ActionsButtons: React.FC<{
  children: React.ReactNode;
  tooltipContent: string;
  path: string;
}> = memo(({ children, path, tooltipContent }) => {
  const { replace } = useRouter();
  const params = useParams();
  const [pending, startTransition] = useTransition();
  const route = (path: string) => {
    return startTransition(() => {
      return replace(`/admin/inventory/${params?.id}/${path}`);
    });
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button
            onClick={() => route(path)}
            variant="secondary"
            size="icon"
            className="shrink-0"
          >
            {pending ? <Spin /> : children}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});
ActionsButtons.displayName = "ActionsButtons";
export default ActionsButtons;
