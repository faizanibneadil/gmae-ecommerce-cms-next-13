"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ChevronsUpDown,
  LayoutGrid,
  Menu,
  Search,
  ShoppingCart,
} from "lucide-react";
import { useSession } from "next-auth/react";
import React, { memo, useEffect, useState, useTransition } from "react";
import { useTheme } from "next-themes";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import CategoriesMenu from "./_components/categories-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";

const Template: React.FC<{
  children: React.ReactNode;
}> = memo(({ children }) => {
  const { push } = useRouter();
  const { setTheme } = useTheme();
  const { data: session } = useSession();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return windowWidth <= 768 ? (
    <div>
      <div className="sticky top-0 z-50 flex items-center justify-between  space-x-1 bg-white dark:bg-[#020817] border-b">
        {/* navigation bar  */}
        <div className="flex flex-row items-center p-2 space-x-2">
          {/* logo  */}
          <Avatar>
            <AvatarImage src="https://img.freepik.com/free-vector/flat-design-mobile-store-logo-template_23-2149728794.jpg" />
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>

          <div className="flex items-center space-x-1">
            <Input
              className="h-8 py-1 rounded-full"
              placeholder="Search Product ..."
            />
            {/* <Button size="icon" variant="secondary" className="shrink-0">
              <Search />
            </Button> */}
          </div>
          <div className="flex flex-row items-center space-x-2">
            {/* / cart button  */}
            <Sheet>
              <SheetTrigger>
                <Button
                  variant="outline"
                  className="w-8 h-8 rounded-full"
                  size="icon"
                >
                  <ShoppingCart className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Are you sure absolutely sure?</SheetTitle>
                  <SheetDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>

            {/* user button  */}
            <Sheet>
              <SheetTrigger>
                <Avatar>
                  <AvatarImage src={`${session?.user.image}`} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </SheetTrigger>
              <SheetContent side="bottom" className="space-y-2 h-80">
                <div className="flex flex-col items-center justify-center">
                  {session?.user.name}
                  <p className="text-xs">{session?.user?.email}</p>
                </div>

                <div className="flex flex-col items-center justify-center w-full space-y-2">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={`${session?.user.image}`} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="w-full">
                    My Orders
                  </Button>
                  <div className="flex flex-row items-center justify-between w-full space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-full"
                      onClick={() => setTheme("light")}
                    >
                      Light
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-full"
                      onClick={() => setTheme("dark")}
                    >
                      Dark
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-full"
                      onClick={() => setTheme("system")}
                    >
                      Default
                    </Button>
                  </div>
                  <Button variant="destructive" className="w-full">
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      {/* tab bar  */}
      <ScrollArea className="w-full h-auto border-b">
        <ScrollBar orientation="horizontal" className="hidden" />
        <div className="flex flex-row items-center justify-center space-x-1">
          <Button
            variant="outline"
            size="sm"
            className="border-none rounded-none min-w-max"
            onClick={() => push("/")}
          >
            For You
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-none rounded-none min-w-max"
            onClick={() => push("/categories")}
          >
            Categories
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-none rounded-none min-w-max"
            onClick={() => push("/")}
          >
            Brands
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-none rounded-none min-w-max"
            onClick={() => push("/")}
          >
            New Arrivals
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-none rounded-none min-w-max"
            onClick={() => push("/")}
          >
            Offers & Discounts
          </Button>
        </div>
      </ScrollArea>
      <div>{children}</div>
    </div>
  ) : (
    <div>
      <div className="sticky top-0 z-50 flex items-center justify-between p-2 space-x-1 bg-white dark:bg-[#020817] border-b">
        <div className="flex flex-row items-center space-x-2">
          <Avatar>
            <AvatarImage src="https://img.freepik.com/free-vector/flat-design-mobile-store-logo-template_23-2149728794.jpg" />
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
          <h1 className="font-semibold">TechChowk</h1>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <CategoriesMenu />
          <div className="flex items-center space-x-1">
            <Input className="w-[30rem]" placeholder="Search Product ..." />
            <Button size="icon" variant="secondary" className="shrink-0">
              <Search />
            </Button>
          </div>
        </div>

        <div className="flex flex-row items-center space-x-2">
          {/* / cart button  */}
          <Sheet>
            <SheetTrigger>
              <Button variant="ghost" size="icon">
                <ShoppingCart />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Are you sure absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          {/* user button  */}
          <Sheet>
            <SheetTrigger>
              <Avatar>
                <AvatarImage src={`${session?.user.image}`} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </SheetTrigger>
            <SheetContent side="right" className="space-y-2">
              <div className="flex flex-col items-center justify-center">
                {session?.user.name}
                <p className="text-xs">{session?.user?.email}</p>
              </div>

              <div className="flex flex-col items-center justify-center w-full space-y-2">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={`${session?.user.image}`} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Button variant="outline" className="w-full">
                  My Orders
                </Button>
                <div className="flex flex-row items-center justify-between w-full space-x-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-full"
                    onClick={() => setTheme("light")}
                  >
                    Light
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-full"
                    onClick={() => setTheme("dark")}
                  >
                    Dark
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-full"
                    onClick={() => setTheme("system")}
                  >
                    Default
                  </Button>
                </div>
                <Button variant="destructive" className="w-full">
                  Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
});
Template.displayName = "Template";
export default Template;
