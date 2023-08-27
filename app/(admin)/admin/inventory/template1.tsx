"use client";

import { useParams } from "next/navigation";
import InitializeNewInventory from "./_components/initialize-new-inventory";
import RefreshPage from "./_components/refresh-button";
import {
  Activity,
  AreaChart,
  Cloud,
  CreditCard,
  Github,
  ImagePlus,
  Keyboard,
  LifeBuoy,
  List,
  ListTree,
  LogOut,
  Mail,
  MessageSquare,
  PackagePlus,
  PackageSearch,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Icon } from "@tremor/react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  MoveLeftIcon,
  PlusIcon,
  RefreshIcon,
  SearchIcon,
} from "@/app/_components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuSubTrigger } from "@radix-ui/react-dropdown-menu";
import { Separator } from "@/components/ui/separator";

interface Props {
  children: React.ReactNode;
}

const Template: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const params = useParams();
  return params?.id ? (
    <div>
      <Card className="border-none">
        <CardContent className="p-2">
          <div className="flex items-center justify-between">
            <Button>
              <MoveLeftIcon className="w-4 h-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">More Options.</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Edit Product</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
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
            {/* <div className="flex items-center justify-center space-x-2">
              <Button>
                <ImagePlus className="w-4 h-4" />
                <span className="hidden mx-2 md:flex">Add Images</span>
              </Button>
              <Button>
                <PackagePlus className="w-4 h-4" />
                <span className="hidden mx-2 md:flex">Add Variants</span>
              </Button>
            </div> */}
          </div>
        </CardContent>
      </Card>
      <Separator />

      {children}
    </div>
  ) : (
    <div>
      <Card className="border-none">
        <CardContent className="p-2">
          <div className="flex items-center justify-center space-x-2">
            <Input type="search" placeholder="Search ..." />
            <Button size="icon">
              <SearchIcon />
            </Button>
            <Button size="icon">
              <PlusIcon />
            </Button>
            <Button size="icon">
              <RefreshIcon />
            </Button>
          </div>
        </CardContent>
      </Card>
      <Separator />

      {children}
    </div>
  );
};

export default Template;
