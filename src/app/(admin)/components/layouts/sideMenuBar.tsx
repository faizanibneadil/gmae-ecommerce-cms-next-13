"use client";
import {
  CaretDownIcon,
  CheckIcon,
  ChevronRightIcon,
  DashboardIcon,
  DotFilledIcon,
  GearIcon,
  PieChartIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { useState } from "react";

const ListItem = ({ children, title, ...props }: any) => (
  <li>
    <NavigationMenu.Link asChild>
      <a
        className="focus:shadow-[0_0_0_2px] focus:shadow-violet7 hover:bg-mauve3 block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline outline-none transition-colors"
        {...props}
      >
        <div className="text-violet12 mb-[5px] font-medium leading-[1.2]">
          {title}
        </div>
        <p className="text-mauve11 leading-[1.4]">{children}</p>
      </a>
    </NavigationMenu.Link>
  </li>
);

export default function SideMenuBar() {
  return (
    <NavigationMenu.Root className="">
      <NavigationMenu.List className="flex flex-row justify-center md:space-x-0 md:space-y-2 md:flex-col">
        <NavigationMenu.Item className="cursor-pointer md:px-6 hover:bg-gray-500">
            <Link href="/admin" className="flex flex-col items-center space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                <div className="p-4 md:p-0"><PieChartIcon /></div>
                <div className="hidden md:block">Dashboard</div>
            </Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item className="cursor-pointer md:px-6 hover:bg-gray-500">
            <Link href="/create" className="flex flex-col items-center space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                <div className="p-4 md:p-0"><PlusIcon /></div>
                <div className="hidden md:block">Create</div>
            </Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item className="cursor-pointer md:px-6 hover:bg-gray-500">
            <Link href="/products" className="flex flex-col items-center space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                <div className="p-4 md:p-0"><DashboardIcon /></div>
                <div className="hidden md:block">Products</div>
            </Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item className="cursor-pointer md:px-6 hover:bg-gray-500">
            <Link href="/settings" className="flex flex-col items-center space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                <div className="p-4 md:p-0"><GearIcon /></div>
                <div className="hidden md:block">Settings</div>
            </Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
