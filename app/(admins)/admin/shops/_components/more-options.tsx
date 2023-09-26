"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Map, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { memo, useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";

const MoreOptions: React.FC<{
  id: string;
}> = memo(({ id }) => {
  const [pending, startTransition] = useTransition();
  const { replace } = useRouter();

  const route = (path: string) => {
    return startTransition(() => {
      return replace(`/admin/shops/${path}`);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="max-w-[14rem]">
        <Button variant="outline" disabled={pending} className="w-full">
          {pending ? <Spin /> : `Options`}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" loop>
        <DropdownMenuLabel className="flex items-center justify-between">
          Edit Shop
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => route(`/${id}`)}>
            <Pencil className="w-4 h-4 mr-2" />
            <span>Edit Shop</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => route(`/${id}/area`)}>
            <Map className="w-4 h-4 mr-2" />
            <span>Update Area</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
MoreOptions.displayName = "MoreOptions";
export default MoreOptions;
