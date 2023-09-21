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
  ArrowLeftRight,
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
  Plus,
  Receipt,
  Sheet,
  Target,
  User,
  UserCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { memo, useTransition } from "react";
import Spin from "@/app/_components/loading-spinner";

const MoreOptions: React.FC<{}> = memo(() => {
  const [pending, startTransition] = useTransition();
  const { replace } = useRouter();
  const route = (path: string) => {
    return startTransition(() => {
      return replace(`/admin/transactions/${path}`);
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
            <p>Transactions Options.</p>
          </DropdownMenuLabel>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => route(`/billing`)}>
            <Receipt className="w-4 h-4 mr-2" />
            <span>Billing</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => route(`/sale-return`)}>
            <ArrowLeftRight className="w-4 h-4 mr-2" />
            <span>Sale Return</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => route(`/load-sheet`)}>
            <Sheet className="w-4 h-4 mr-2" />
            <span>Load Sheet</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => route(`/dsr`)}>
            <Sheet className="w-4 h-4 mr-2" />
            <span>DSR</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => route(`/`)}>
            <ArrowLeftRight className="w-4 h-4 mr-2" />
            <span>Transactions</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
MoreOptions.displayName = "MoreOptions";
export default MoreOptions;
