"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FactoryIcon, ImageIcon } from "@/app/_components/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import {
  ArrowLeftRight,
  Gauge,
  ListChecks,
  Map,
  Package,
  Settings,
  Store,
  Target,
  Truck,
  Users,
} from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import DistributionSwitcher from "./distribution-switcher";

interface Props {
  distributions: {
    id: string;
    name: string;
    ledgerId: string | null;
  }[];
}

const SideBar: React.FC<Props> = ({ distributions }) => {
  const pathname = usePathname();
  const distributionId = useParams()?.distributionId as string;
  const MENU = [
    {
      icon: <Gauge className="w-5 h-5" />,
      name: "Dashboard",
      href: `/distribution/${distributionId}`,
    },
    {
      icon: <Package className="w-5 h-5" />,
      name: "Inventory",
      href: `/distribution/${distributionId}/inventory`,
    },
    {
      icon: <ImageIcon className="w-5 h-5" />,
      name: "Images",
      href: `/distribution/${distributionId}/images`,
    },
    {
      icon: <FactoryIcon className="w-5 h-5" />,
      name: "Companies",
      href: `/distribution/${distributionId}/companies`,
    },
    {
      icon: <Target className="w-5 h-5" />,
      name: "Brands",
      href: `/distribution/${distributionId}/brands`,
    },
    {
      icon: <Map className="w-5 h-5" />,
      name: "Areas",
      href: `/distribution/${distributionId}/areas`,
    },
    {
      icon: <Store className="w-5 h-5" />,
      name: "Shops",
      href: `/distribution/${distributionId}/shops`,
    },
    {
      icon: <ListChecks className="w-5 h-5" />,
      name: "Categories",
      href: `/distribution/${distributionId}/categories`,
    },
    {
      icon: <Truck className="w-5 h-5" />,
      name: "Orders",
      href: `/distribution/${distributionId}/orders`,
    },
    {
      icon: <ArrowLeftRight className="w-5 h-5" />,
      name: "Transactions",
      href: `/distribution/${distributionId}/transactions`,
    },
    {
      icon: <Users className="w-5 h-5" />,
      name: "Users",
      href: `/distribution/${distributionId}/users`,
    },
    {
      icon: <Settings className="w-5 h-5" />,
      name: "Settings",
      href: `/distribution/${distributionId}/settings`,
    },
  ];

  return (
    <aside className="w-12 h-screen overflow-hidden border-r shadow-inner md:py-2 md:w-48">
      <div className="flex flex-col justify-between h-full">
        <div className="p-1 space-y-2 md:flex md:flex-col md:items-center">
          <Avatar className="md:w-20 md:h-20">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="hidden font-semibold md:block">easypeasy</h1>
        </div>
        <ScrollArea className="w-full h-full mt-1 mb-1">
          <div className="flex flex-col space-y-0.5">
            {MENU.map((m) => (
              <Link
                key={m.href}
                className={buttonVariants({
                  variant: m.href === pathname ? "default" : "secondary",
                  className: `w-full flex items-center justify-between pl-3 rounded-none`,
                  size: "sm",
                })}
                href={m.href}
              >
                {m.icon}
                <span className="hidden md:block">{m.name}</span>
              </Link>
            ))}
          </div>
        </ScrollArea>

        <DistributionSwitcher distributions={distributions} />
      </div>
    </aside>
  );
};

export default SideBar;
