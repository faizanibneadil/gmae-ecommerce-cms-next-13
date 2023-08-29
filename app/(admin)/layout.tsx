import { use } from "react";
import DashboardRoute from "./_components/dashboard-route-btn";
import UsersRoute from "./_components/users-route-btn";
import InventoryRoute from "./_components/inventory-route-btn";
import CategoriesRoute from "./_components/categories-route-btn";
import GalleryRoute from "./_components/gallery-route-btn";
import DeliveriesRoute from "./_components/deliveries-route-btn";
import TransactionsRoute from "./_components/transactions-route-btn";
import CouponsRoute from "./_components/coupons-route-btn";
import CustomersRoute from "./_components/customers-route-btn";
import SettingsRoute from "./_components/settings-route-btn";
import { getServerSession } from "next-auth";
import AdminLogin from "./_components/authButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Menu from "@/app/(admin)/_components/menu";
import Command from "@/app/(admin)/_components/cmd/command";

export const dynamic = "force-dynamic";

export default function Layout({ children }: { children: React.ReactNode }) {
  const session = use(getServerSession());
  return session ? (
    <div>
      <Command />
      <div className="sticky top-0 z-50 flex items-center justify-between p-2 space-x-1 bg-white dark:bg-[#020817] border-b">
        <Avatar>
          <AvatarImage src="https://img.freepik.com/free-vector/flat-design-mobile-store-logo-template_23-2149728794.jpg" />
          <AvatarFallback>LG</AvatarFallback>
        </Avatar>
        <Menu />
        <Avatar>
          <AvatarImage src={`${session?.user.image}`} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      {children}
    </div>
  ) : (
    <AdminLogin />
  );
}
