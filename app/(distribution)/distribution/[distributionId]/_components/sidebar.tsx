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
  Store,
  Users,
} from "lucide-react";
import { ComboboxDemo } from "./select-distribution";
import { useParams } from "next/navigation";

const SideBar: React.FC<{}> = () => {
  const distributionId = useParams()?.distributionId as string;
  return (
    <aside className="w-12 h-screen p-1 overflow-hidden border-r shadow-inner md:px-1 md:py-2 md:w-48">
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-2 md:flex md:flex-col md:items-center">
          <Avatar className="md:w-20 md:h-20">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="hidden font-semibold md:block">easypeasy</h1>
          <ComboboxDemo />
        </div>
        <ScrollArea className="w-full h-full mt-5 mb-5">
          <div className="flex flex-col space-y-1">
            <Link
              href={`/distribution/${distributionId}`}
              className="flex items-center space-x-1 h-8 px-2 py-1.5 rounded-none"
            >
              <Gauge className="w-4 h-4" />
              <span className="hidden md:block">Dashboard</span>
            </Link>
            <Link
              href={`/distribution/${distributionId}/inventory`}
              className="flex items-center space-x-1 h-8 px-2 py-1.5 rounded-none"
            >
              <Package className="w-4 h-4" />
              <span className="hidden md:block">Inventory</span>
            </Link>
            <Link
              href={`/distribution/${distributionId}/images`}
              className="flex items-center space-x-1 h-8 px-2 py-1.5 rounded-none"
            >
              <ImageIcon className="w-4 h-4" />
              <span className="hidden md:block">Images</span>
            </Link>
            <Link
              href={`/distribution/${distributionId}/companies`}
              className="flex items-center space-x-1 h-8 px-2 py-1.5 rounded-none"
            >
              <FactoryIcon className="w-4 h-4" />
              <span className="hidden md:block">Companies</span>
            </Link>
            <Link
              href={`/distribution/${distributionId}/areas`}
              className="flex items-center space-x-1 h-8 px-2 py-1.5 rounded-none"
            >
              <Map className="w-4 h-4" />
              <span className="hidden md:block">Areas</span>
            </Link>
            <Link
              href={`/distribution/${distributionId}/shops`}
              className="flex items-center space-x-1 h-8 px-2 py-1.5 rounded-none"
            >
              <Store className="w-4 h-4" />
              <span className="hidden md:block">Shops</span>
            </Link>
            <Link
              href={`/distribution/${distributionId}/categories`}
              className="flex items-center space-x-1 h-8 px-2 py-1.5 rounded-none"
            >
              <ListChecks className="w-4 h-4" />
              <span className="hidden md:block">Categories</span>
            </Link>
            <Link
              href={`/distribution/${distributionId}/transactions`}
              className="flex items-center space-x-1 h-8 px-2 py-1.5 rounded-none"
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span className="hidden md:block">Transactions</span>
            </Link>
            <Link
              href={`/distribution/${distributionId}/users`}
              className="flex items-center space-x-1 h-8 px-2 py-1.5 rounded-none"
            >
              <Users className="w-4 h-4" />
              <span className="hidden md:block">Users</span>
            </Link>
          </div>
        </ScrollArea>

        <div className="flex items-center space-x-1 cursor-pointer">
          <div className="flex-shrink-0">
            <Avatar>
              <AvatarImage
                src="https://github.com/faizanibneadil.png"
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 min-w-0 ">
            <p className="text-sm font-medium truncate">username</p>
            <p className="text-sm truncate">faizanibneadil@gmail.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
