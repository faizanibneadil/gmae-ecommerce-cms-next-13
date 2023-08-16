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
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

export default function Layout({ children }: { children: React.ReactNode }) {
  const session = use(getServerSession());
  return (
    <div className="flex">
      <div className="sticky top-0 bottom-0 left-0 z-50 flex flex-col items-center justify-between h-[100vh] space-y-2 bg-white p-1 md:px-3 border border-r">
        <Link href="/" className="mt-2">
          <Image
            alt="Brand Logo Image"
            width={100}
            height={75}
            className="w-10"
            src="/logo.png"
          />
        </Link>
        <div className="flex flex-col items-center justify-between space-y-1 overflow-y-auto">
          <DashboardRoute />
          <InventoryRoute />
          <CategoriesRoute />
          <GalleryRoute />
          <DeliveriesRoute />
          <TransactionsRoute />
          <CouponsRoute />
          <CustomersRoute />
          <UsersRoute />
          <SettingsRoute />
        </div>
        {session ? (
          <Link href="/admin/me" className="pb-2">
            <Image
              alt="Brand Logo Image"
              width={100}
              height={75}
              className="w-8 rounded-full"
              src={`${session?.user.image}`}
            />
          </Link>
        ) : (
          `login`
        )}
      </div>
      <div className="flex-auto">{children}</div>
    </div>
  );
}
