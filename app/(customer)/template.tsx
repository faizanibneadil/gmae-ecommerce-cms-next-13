"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import { memo, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Input } from "@/components/ui/input";
import CategoriesMenu from "./_components/categories-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import CartComponent from "./_components/cart-component";
import UserComponent from "./_components/user-component";

const Template: React.FC<{
  children: React.ReactNode;
}> = memo(({ children }) => {
  const { push } = useRouter();
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
            <CartComponent />
            <UserComponent side="bottom" />
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
          <CartComponent />
          <UserComponent side="right" />
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
});
Template.displayName = "Template";
export default Template;
