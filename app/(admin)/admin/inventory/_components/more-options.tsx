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
  Trees,
} from "lucide-react";
import { memo } from "react";

const MoreOptions: React.FC<{ id: string }> = memo(({ id }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Edit Product</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <ListChecks className="w-4 h-4 mr-2" />
            <span>Add Categories</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ImagePlus className="w-4 h-4 mr-2" />
            <span>Add Images</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PackagePlus className="w-4 h-4 mr-2" />
            <span>Add Variants</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <List className="w-4 h-4 mr-2" />
            <span>Add Attributes</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
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
