"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart } from "lucide-react";
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

const Template: React.FC<{
  children: React.ReactNode;
}> = memo(({ children }) => {
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
      <div className="sticky top-0 z-50 flex items-center justify-between p-2 space-x-1 bg-white dark:bg-[#020817] border-b">
        <div className="flex flex-row items-center space-x-2">
          {/* // menu  */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Are you sure absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          {/* logo  */}
          <Avatar className="px-4 bg-white rounded-md w-28">
            <AvatarImage src="/logo.png" />
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
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
            <SheetContent side="bottom" className="h-80">
              <SheetHeader>
                <SheetTitle className="flex flex-col items-center justify-center">
                  {session?.user.name}
                  <p className="text-xs">{session?.user?.email}</p>
                </SheetTitle>

                <SheetDescription>
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
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div>{children}</div>
    </div>
  ) : (
    <div>
      <div className="sticky top-0 z-50 flex items-center justify-between p-2 space-x-1 bg-white dark:bg-[#020817] border-b">
        <Avatar className="px-4 bg-white rounded-md w-28">
          <AvatarImage src="/logo.png" />
          <AvatarFallback>LG</AvatarFallback>
        </Avatar>
        <div>Navigation</div>
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
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="flex flex-col items-center justify-center">
                  {session?.user.name}
                  <p className="text-xs">{session?.user?.email}</p>
                </SheetTitle>

                <SheetDescription>
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
                </SheetDescription>
              </SheetHeader>
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
