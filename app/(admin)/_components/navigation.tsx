import { Button } from "@tremor/react";
import {
  ArrowRightLeft,
  Gauge,
  ImageIcon,
  LayoutGrid,
  List,
  Percent,
  Settings,
  Truck,
  Users,
  Users2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AuthButton from "./authButton";

export default function Navigation() {
  return (
    <div className="sticky top-0 z-[70] grid grid-flow-row-dense grid-cols-2 shadow-md md:grid-row-1 md:grid-cols-4 bg-white">
      <div className="flex items-center justify-start p-2 pl-4 border-b-2 md:border-b-0">
        <Link href="/">
          <Image
            alt="Brand Logo Image"
            width={100}
            height={75}
            className="w-8 md:w-20"
            src="/logo.png"
          />
        </Link>
      </div>
      <div className="flex items-center justify-center col-span-2 ">
        <div className="grid grid-flow-col overflow-x-scroll no-scrollbar auto-cols-max">
          <Link
            href="/admin"
            className="inline-flex flex-col items-center justify-center p-2 hover:bg-gray-300 group"
          >
            <Gauge className="w-5 h-5 mb-1 text-gray-950 group-hover:text-blue-600" />
            <span className="text-xs font-semibold truncate text-ay-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Dashboard
            </span>
          </Link>
          <Link
            href="/admin/inventory"
            className="inline-flex flex-col items-center justify-center p-2 hover:bg-gray-300 group"
          >
            <LayoutGrid className="w-5 h-5 mb-1 text-gray-950 group-hover:text-blue-600" />
            <span className="text-xs font-semibold truncate text-ay-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Inventory
            </span>
          </Link>
          <Link
            href="/admin/categories"
            className="inline-flex flex-col items-center justify-center p-2 hover:bg-gray-300 group"
          >
            <List className="w-5 h-5 mb-1 text-gray-950 group-hover:text-blue-600" />
            <span className="text-xs font-semibold truncate text-ay-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Categories
            </span>
          </Link>
          <Link
            href="/admin/images"
            className="inline-flex flex-col items-center justify-center p-2 hover:bg-gray-300 group"
          >
            <ImageIcon className="w-5 h-5 mb-1 text-gray-950 group-hover:text-blue-600" />
            <span className="text-xs font-semibold truncate text-ay-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Image Gallery
            </span>
          </Link>

          <Link
            href="/admin/deliveries"
            className="inline-flex flex-col items-center justify-center p-2 hover:bg-gray-300 group"
          >
            <Truck className="w-5 h-5 mb-1 text-gray-950 group-hover:text-blue-600" />
            <span className="text-xs font-semibold truncate text-ay-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Deliveries
            </span>
          </Link>
          <Link
            href="/admin/transactions"
            className="inline-flex flex-col items-center justify-center p-2 hover:bg-gray-300 group"
          >
            <ArrowRightLeft className="w-5 h-5 mb-1 text-gray-950 group-hover:text-blue-600" />
            <span className="text-xs font-semibold truncate text-ay-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Transactions
            </span>
          </Link>
          <Link
            href="/admin/coupons"
            className="inline-flex flex-col items-center justify-center p-2 hover:bg-gray-300 group"
          >
            <Percent className="w-5 h-5 mb-1 text-gray-950 group-hover:text-blue-600" />
            <span className="text-xs font-semibold truncate text-ay-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Coupons
            </span>
          </Link>
          <Link
            href="/admin/users"
            className="inline-flex flex-col items-center justify-center p-2 hover:bg-gray-300 group"
          >
            <Users className="w-5 h-5 mb-1 text-gray-950 group-hover:text-blue-600" />
            <span className="text-xs font-semibold truncate text-ay-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Users
            </span>
          </Link>
          <Link
            href="/admin/customers"
            className="inline-flex flex-col items-center justify-center p-2 hover:bg-gray-300 group"
          >
            <Users2 className="w-5 h-5 mb-1 text-gray-950 group-hover:text-blue-600" />
            <span className="text-xs font-semibold truncate text-ay-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Customers
            </span>
          </Link>
          <Link
            href="/admin/settings"
            className="inline-flex flex-col items-center justify-center p-2 hover:bg-gray-300 group"
          >
            <Settings className="w-5 h-5 mb-1 text-gray-950 group-hover:text-blue-600" />
            <span className="text-xs font-semibold truncate text-ay-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Settings
            </span>
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-end p-2 pr-4 border-b-2 md:border-b-0">
        <AuthButton />
      </div>
    </div>
  );
}
