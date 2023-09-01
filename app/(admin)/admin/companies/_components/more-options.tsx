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
import {
  Eye,
  Globe,
  ImagePlus,
  Layout,
  List,
  ListChecks,
  MoreHorizontal,
  PackagePlus,
  PackageSearch,
  Pencil,
} from "lucide-react";
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
      return replace(`/admin/images/${path}`);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={pending}>
          {pending ? <Spin /> : `Options`}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" loop>
        <DropdownMenuLabel className="flex items-center justify-between">
          Edit Image
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => route(`/${id}`)}>
            <Pencil className="w-4 h-4 mr-2" />
            <span>Edit Properties</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => route(`/${id}/products`)}>
            <ImagePlus className="w-4 h-4 mr-2" />
            <span>Add Products</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => route(`/${id}/categories`)}>
            <PackagePlus className="w-4 h-4 mr-2" />
            <span>Add Categories</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
MoreOptions.displayName = "MoreOptions";
export default MoreOptions;
