import { Button } from "@tremor/react";
import {
  LayoutGrid,
  ShoppingBag,
  Star,
  Store,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navigation() {
  return (
    <>
      <div className="sticky top-0 z-50 grid grid-flow-row-dense grid-cols-2 shadow-md md:grid-row-1 md:grid-cols-4 bg-white/5 backdrop-blur">
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
            <button className="inline-flex flex-col items-center justify-center p-2 hover:bg-gray-300 group">
              <Store className="w-5 h-5 mb-1 text-gray-500 group-hover:text-blue-600" />
              <span className="text-xs text-gray-500 truncate dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                Shopping
              </span>
            </button>
            <Link
              href="/admin/products"
              className="inline-flex flex-col items-center justify-center p-2 hover:bg-gray-300 group"
            >
              <LayoutGrid className="w-5 h-5 mb-1 text-gray-500 group-hover:text-blue-600" />
              <span className="text-xs text-gray-500 truncate dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                Categories
              </span>
            </Link>
            <Link
              href="/create"
              className="inline-flex flex-col items-center justify-center p-2 hover:bg-gray-300 group"
            >
              <Star className="w-5 h-5 mb-1 text-gray-500 group-hover:text-blue-600" />
              <span className="text-xs text-gray-500 truncate dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                My Favorite
              </span>
            </Link>

            <Link
              href="/create/user"
              className="inline-flex flex-col items-center justify-center p-2 hover:bg-gray-300 group"
            >
              <ShoppingBag className="w-5 h-5 mb-1 text-gray-500 group-hover:text-blue-600" />
              <span className="text-xs text-gray-500 truncate dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                My Cart
              </span>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-end p-2 pr-4 border-b-2 md:border-b-0">
          <Button size="xs" variant="light">
            login
          </Button>
        </div>
      </div>
    </>
  );
}
