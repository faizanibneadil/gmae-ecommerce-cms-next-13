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
  Factory,
  Map,
  Pencil,
  Target,
  User,
  UserCircle,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { memo, useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";

const MoreOptions: React.FC<{}> = memo(() => {
  const id = useParams()?.id as string; // userId
  const [pending, startTransition] = useTransition();
  const { replace } = useRouter();

  const route = (path: string) => {
    return startTransition(() => {
      return replace(`/admin/users/${path}`);
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
          More Options
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => route(`/${id}`)}>
            <UserCircle className="w-4 h-4 mr-2" />
            <span>Edit Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => route(`/${id}/areas`)}>
            <Map className="w-4 h-4 mr-2" />
            <span>Update Areas</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => route(`/${id}/companies`)}>
            <Factory className="w-4 h-4 mr-2" />
            <span>Update Companies</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => route(`/${id}/brands`)}>
            <Target className="w-4 h-4 mr-2" />
            <span>Update Brands</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => route(`/${id}/sales-mans`)}>
            <User className="w-4 h-4 mr-2" />
            <span>Update Sales Manes</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => route(`/${id}/schedule`)}>
            <Calendar className="w-4 h-4 mr-2" />
            <span>Update Schedule</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
MoreOptions.displayName = "MoreOptions";
export default MoreOptions;
