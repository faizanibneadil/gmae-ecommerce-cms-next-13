"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FactoryIcon, ImageIcon } from "@/app/_components/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowLeftRight,
  Book,
  Gauge,
  ListChecks,
  Map,
  Package,
  Receipt,
  Settings,
  Store,
  Target,
  Truck,
  Users,
} from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
const DistributionSwitcher = dynamic(() => import("./distribution-switcher"), {
  ssr: false,
  loading: () => <div>Loading ..</div>,
});

interface Props {
  distributions: {
    id: string;
    name: string;
    ledgerId: string | null;
  }[];
}

const SideBar: React.FC<Props> = ({ distributions }) => {
  const pathname = usePathname();
  const did = useParams()?.did as string;
  const MENU = [
    {
      icon: <Gauge className="w-5 h-5" />,
      name: "Dashboard",
      href: `/d/${did}`,
    },
    {
      icon: <Package className="w-5 h-5" />,
      name: "Inventory",
      href: `/d/${did}/inventory`,
    },
    {
      icon: <ImageIcon className="w-5 h-5" />,
      name: "Images",
      href: `/d/${did}/images`,
    },
    {
      icon: <FactoryIcon className="w-5 h-5" />,
      name: "Companies",
      href: `/d/${did}/companies`,
    },
    {
      icon: <Target className="w-5 h-5" />,
      name: "Brands",
      href: `/d/${did}/brands`,
    },
    {
      icon: <Map className="w-5 h-5" />,
      name: "Areas",
      href: `/d/${did}/areas`,
    },
    {
      icon: <Store className="w-5 h-5" />,
      name: "Shops",
      href: `/d/${did}/shops`,
    },
    {
      icon: <ListChecks className="w-5 h-5" />,
      name: "Categories",
      href: `/d/${did}/categories`,
    },
    {
      icon: <Truck className="w-5 h-5" />,
      name: "Orders",
      href: `/d/${did}/orders`,
    },
    {
      icon: <ArrowLeftRight className="w-5 h-5" />,
      name: "Transactions",
      href: `/d/${did}/transactions`,
    },
    {
      icon: <Receipt className="w-5 h-5" />,
      name: "Generate Invoice",
      href: `/d/${did}/invoice`,
    },
    {
      icon: <Book className="w-5 h-5" />,
      name: "Ledger",
      href: `/d/${did}/ledger`,
    },
    {
      icon: <Users className="w-5 h-5" />,
      name: "Users",
      href: `/d/${did}/users`,
    },
    {
      icon: <Settings className="w-5 h-5" />,
      name: "Settings",
      href: `/d/${did}/settings`,
    },
  ];

  return (
    <aside className="w-12 h-screen overflow-hidden border-r shadow-inner md:py-2 md:w-48">
      <div className="flex flex-col justify-between h-full">
        <div className="p-1 space-y-2 md:flex md:flex-col md:items-center">
          <Avatar className="md:w-20 md:h-20">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              referrerPolicy="no-referrer"
            />
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
