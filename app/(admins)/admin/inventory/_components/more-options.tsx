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
  Calendar,
  Eye,
  Factory,
  Globe,
  ImagePlus,
  Layout,
  List,
  ListChecks,
  Map,
  PackagePlus,
  PackageSearch,
  Pencil,
  Target,
  User,
  UserCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { memo, useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";

const MoreOptions: React.FC<{
  id: string;
  isPublished?: boolean | null;
  isFeatured?: boolean | null;
}> = memo(({ id }) => {
  const [pending, startTransition] = useTransition();
  const { replace } = useRouter();
  const route = (path: string) => {
    return startTransition(() => {
      return replace(`/admin/inventory/${path}`);
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
          <DropdownMenuLabel className="flex items-center justify-between">
            <p>Edit Product</p>
          </DropdownMenuLabel>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => route(`/${id}`)}>
            <Pencil className="w-4 h-4 mr-2" />
            <span>Edit Properties</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => route(`/${id}/companies`)}>
            <Factory className="w-4 h-4 mr-2" />
            <span>Edit Companies</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => route(`/${id}/categories`)}>
            <ListChecks className="w-4 h-4 mr-2" />
            <span>Edit Categories</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => route(`/${id}/images`)}>
            <ImagePlus className="w-4 h-4 mr-2" />
            <span>Edit Images</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => route(`/${id}/variants`)}>
            <PackagePlus className="w-4 h-4 mr-2" />
            <span>Edit Variants</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => route(`/${id}/attributes`)}>
            <List className="w-4 h-4 mr-2" />
            <span>Edit Attributes</span>
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
