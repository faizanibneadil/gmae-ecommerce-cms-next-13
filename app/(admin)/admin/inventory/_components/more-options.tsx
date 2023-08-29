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
  ImagePlus,
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

const MoreOptions: React.FC<{ id: string }> = memo(({ id }) => {
  const [pending, startTransition] = useTransition();
  const { replace } = useRouter();
  const route = (path: string) => {
    return startTransition(() => {
      return replace(`/admin/inventory/${path}`);
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={pending}>
          {pending ? <Spin /> : <MoreHorizontal />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Edit Product</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => route(`/${id}`)}>
            <Pencil className="w-4 h-4 mr-2" />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ListChecks className="w-4 h-4 mr-2" />
            <span>Add Categories</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => route(`/${id}/images`)}>
            <ImagePlus className="w-4 h-4 mr-2" />
            <span>Add Images</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => route(`/${id}/variants`)}>
            <PackagePlus className="w-4 h-4 mr-2" />
            <span>Add Variants</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => route(`/${id}/variants`)}>
            <List className="w-4 h-4 mr-2" />
            <span>Add Attributes</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => route(`/${id}/seo`)}>
            <PackageSearch className="w-4 h-4 mr-2" />
            <span>Make SEO</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
MoreOptions.displayName = "MoreOptions";
export default MoreOptions;
