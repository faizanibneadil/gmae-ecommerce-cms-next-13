"use client";
import {
  ArrowLeft,
  ArrowLeftRight,
  BookOpen,
  Building,
  Factory,
  Gauge,
  Globe,
  Image as ImageIcon,
  List,
  ListChecks,
  LogOut,
  Map,
  MenuIcon,
  Package,
  Paperclip,
  Sheet,
  Store,
  Truck,
  UserCircleIcon,
  Users,
} from "lucide-react";
import { memo } from "react";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ArrowBR, PlusIcon, UserIcon } from "@/app/_components/icons";
import Link from "next/link";
import { useParams } from "next/navigation";

const Menu: React.FC<{}> = memo(() => {
  const distributionId = useParams()?.distributionId as string;
  return (
    <Menubar className="flex items-center justify-between border-b border-none rounded-none ">
      <MenubarMenu>
        <MenubarTrigger className="font-bold">
          <MenuIcon className="w-4 h-4 mr-2 md:hidden" />
          <span>easypeasy</span>
        </MenubarTrigger>
        <MenubarContent className="relative">
          <Link href={`/distribution`}>
            <MenubarItem>
              <Building className="w-4 h-4 mr-2" />
              Distributions
            </MenubarItem>
          </Link>
          <Link href={`/distribution/${distributionId}`}>
            <MenubarItem>
              <Gauge className="w-4 h-4 mr-2" />
              Dashboard
            </MenubarItem>
          </Link>
          <Link href={`/distribution/${distributionId}/inventory`}>
            <MenubarItem>
              <Package className="w-4 h-4 mr-2" />
              Inventory
            </MenubarItem>
          </Link>
          <Link href={`/distribution/${distributionId}/images`}>
            <MenubarItem>
              <ImageIcon className="w-4 h-4 mr-2" />
              Images
            </MenubarItem>
          </Link>
          <Link href={`/distribution/${distributionId}/users`}>
            <MenubarItem>
              <Users className="w-4 h-4 mr-2" />
              Users
            </MenubarItem>
          </Link>
          <Link href={`/distribution/${distributionId}/areas`}>
            <MenubarItem>
              <Map className="w-4 h-4 mr-2" />
              Areas
            </MenubarItem>
          </Link>
          <Link href={`/distribution/${distributionId}/companies`}>
            <MenubarItem>
              <Factory className="w-4 h-4 mr-2" />
              Companies
            </MenubarItem>
          </Link>
          <Link href={`/distribution/${distributionId}/shops`}>
            <MenubarItem>
              <Store className="w-4 h-4 mr-2" />
              Shops
            </MenubarItem>
          </Link>
          <Link href={`/distribution/${distributionId}`}>
            <MenubarItem>
              <Package className="w-4 h-4 mr-2" /> All Transactions
            </MenubarItem>
          </Link>
          <Link href={`/distribution/${distributionId}/kpo`}>
            <MenubarItem>
              <PlusIcon className="w-4 h-4 mr-2" /> Create Bill
            </MenubarItem>
          </Link>
          <Link href={`/distribution/${distributionId}/return`}>
            <MenubarItem>
              <ArrowLeft className="w-4 h-4 mr-2" /> Return Bill
            </MenubarItem>
          </Link>
          <Link href={`/distribution/${distributionId}/dsr`}>
            <MenubarItem>
              <Sheet className="w-4 h-4 mr-2" /> Create DSR
            </MenubarItem>
          </Link>
          <Link href={`/distribution/${distributionId}/load-sheet`}>
            <MenubarItem>
              <Sheet className="w-4 h-4 mr-2" /> Create Load Sheet
            </MenubarItem>
          </Link>
        </MenubarContent>
      </MenubarMenu>
      <div className="flex flex-row">
        <MenubarMenu>
          <Link href={`/distribution/${distributionId}`}>
            <MenubarTrigger className="relative hidden md:block">
              Dashboard
            </MenubarTrigger>
          </Link>
        </MenubarMenu>
        <MenubarMenu>
          <Link href={`/distribution/${distributionId}/inventory`}>
            <MenubarTrigger className="relative hidden md:block">
              Inventory
            </MenubarTrigger>
          </Link>
        </MenubarMenu>
        <MenubarMenu>
          <Link href={`/distribution/${distributionId}/images`}>
            <MenubarTrigger className="relative hidden md:block">
              Images
            </MenubarTrigger>
          </Link>
        </MenubarMenu>
        <MenubarMenu>
          <Link href={`/distribution/${distributionId}/users`}>
            <MenubarTrigger className="relative hidden md:block">
              Users
            </MenubarTrigger>
          </Link>
        </MenubarMenu>
        <MenubarMenu>
          <Link href={`/distribution`}>
            <MenubarTrigger className="relative hidden md:block">
              Distributions
            </MenubarTrigger>
          </Link>
        </MenubarMenu>
        <MenubarMenu>
          <Link href={`/distribution/${distributionId}/areas`}>
            <MenubarTrigger className="relative hidden md:block">
              Areas
            </MenubarTrigger>
          </Link>
        </MenubarMenu>
        <MenubarMenu>
          <Link href={`/distribution/${distributionId}/companies`}>
            <MenubarTrigger className="relative hidden md:block">
              Companies
            </MenubarTrigger>
          </Link>
        </MenubarMenu>
        <MenubarMenu>
          <Link href={`/distribution/${distributionId}/shops`}>
            <MenubarTrigger className="relative hidden md:block">
              Shops
            </MenubarTrigger>
          </Link>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="relative hidden md:block">
            Ledger
          </MenubarTrigger>
          <MenubarContent>
            <Link href={`/distribution/${distributionId}/ledger`}>
              <MenubarItem>
                <BookOpen className="w-4 h-4 mr-2" /> Open Ledger
              </MenubarItem>
            </Link>
            <Link href={`/distribution/${distributionId}/ledger/invoice`}>
              <MenubarItem>
                <BookOpen className="w-4 h-4 mr-2" /> Open Invoice
              </MenubarItem>
            </Link>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="relative hidden md:block">
            Transactions
          </MenubarTrigger>
          <MenubarContent>
            <Link href={`/distribution/${distributionId}`}>
              <MenubarItem>
                <Package className="w-4 h-4 mr-2" /> All Transactions
              </MenubarItem>
            </Link>
            <Link href={`/distribution/${distributionId}/kpo`}>
              <MenubarItem>
                <PlusIcon className="w-4 h-4 mr-2" /> Generate Invoice
              </MenubarItem>
            </Link>
            <Link href={`/distribution/${distributionId}/return`}>
              <MenubarItem>
                <PlusIcon className="w-4 h-4 mr-2" /> Return Invoice
              </MenubarItem>
            </Link>
            <Link href={`/distribution/${distributionId}/dsr`}>
              <MenubarItem>
                <Sheet className="w-4 h-4 mr-2" /> Generate DSR
              </MenubarItem>
            </Link>
            <Link href={`/distribution/${distributionId}/load-sheet`}>
              <MenubarItem>
                <Sheet className="w-4 h-4 mr-2" /> Generate Load Sheet
              </MenubarItem>
            </Link>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="pl-1.5 pr-1.5">
            <Globe className="w-5 h-5" />
          </MenubarTrigger>
          <MenubarContent forceMount>
            <Link href={`/distribution/${distributionId}/orders`}>
              <MenubarItem>
                <Truck className="w-4 h-4 mr-2" /> Orders
              </MenubarItem>
            </Link>
            <MenubarItem>
              <ListChecks className="w-4 h-4 mr-2" /> Categories
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="pl-1.5 pr-1.5">
            <UserIcon className="w-5 h-5" />
          </MenubarTrigger>
          <MenubarContent forceMount>
            <Link href={`/distribution/${distributionId}/me`}>
              <MenubarItem>
                <UserCircleIcon className="w-4 h-4 mr-2" /> Profile
              </MenubarItem>
            </Link>
            <MenubarItem>
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </div>
    </Menubar>
  );
});
Menu.displayName = "Menu";
export default Menu;
