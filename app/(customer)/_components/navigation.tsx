"use client";
import { LayoutGrid, ShoppingCart, Star, Store, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Authenticate from "./authenticate";

export default function Navigation() {
  return (
    <>
      <div className="sticky top-0 z-50 grid grid-flow-row-dense grid-cols-2 bg-white shadow-md md:grid-row-1 md:grid-cols-4">
        <div className="items-center justify-start hidden p-2 pl-4 border-b-2 md:flex md:border-b-0">
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
              href="/"
              className="inline-flex flex-col items-center justify-center p-2 hover:bg-gray-300 group"
            >
              <Store className="w-5 h-5 mb-1 text-gray-500 group-hover:text-blue-600" />
              <span className="text-xs text-gray-500 truncate dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                Shopping
              </span>
            </Link>
            <Link
              href="/categories"
              className="inline-flex flex-col items-center justify-center p-2 hover:bg-gray-300 group"
            >
              <LayoutGrid className="w-5 h-5 mb-1 text-gray-500 group-hover:text-blue-600" />
              <span className="text-xs text-gray-500 truncate dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                Categories
              </span>
            </Link>
            <Link
              href="/favorite"
              className="inline-flex flex-col items-center justify-center p-2 hover:bg-gray-300 group"
            >
              <Star className="w-5 h-5 mb-1 text-gray-500 group-hover:text-blue-600" />
              <span className="text-xs text-gray-500 truncate dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                My Favorite
              </span>
            </Link>

            <Link
              href="/cart"
              className="inline-flex flex-col items-center justify-center p-2 hover:bg-gray-300 group"
            >
              <ShoppingCart className="w-5 h-5 mb-1 text-gray-500 group-hover:text-blue-600" />
              <span className="text-xs text-gray-500 truncate dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                My Cart
              </span>
            </Link>

            <Link
              href="/me"
              className="inline-flex flex-col items-center justify-center p-2 hover:bg-gray-300 group"
            >
              <User2 className="w-5 h-5 mb-1 text-gray-500 group-hover:text-blue-600" />
              <span className="text-xs text-gray-500 truncate dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                My Profile
              </span>
            </Link>
          </div>
        </div>
        <div className="items-center justify-end hidden p-2 pr-4 border-b-2 md:flex md:border-b-0">
          <Authenticate />
        </div>
      </div>
    </>
  );
}
