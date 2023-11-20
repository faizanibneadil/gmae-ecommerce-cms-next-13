"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { memo } from "react";

const UserComponent: React.FC<{
  side: "bottom" | "left" | "right" | "top";
}> = memo(({ side }) => {
  const { replace } = useRouter();
  const { setTheme } = useTheme();
  const { data: session } = useSession();
  return session ? (
    <Sheet>
      <SheetTrigger>
        <Avatar>
          <AvatarImage src={`${session?.user.image}`} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent
        side={side}
        className={`space-y-2 ${
          (side === "top" || side === "bottom") && "h-100"
        }`}
      >
        <div className="flex flex-col items-center justify-center">
          {session?.user.name}
          <p className="text-xs">{session?.user?.email}</p>
        </div>

        <div className="flex flex-col items-center justify-center w-full space-y-2">
          <Avatar className="w-20 h-20">
            <AvatarImage src={`${session?.user.image}`} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Button
            onClick={() => replace("/orders")}
            variant="outline"
            className="w-full"
          >
            My Orders
          </Button>
          <Button variant="secondary" className="w-full">
            My Favorites
          </Button>
          <Button
            onClick={() => replace("/me/address")}
            variant="secondary"
            className="w-full"
          >
            My Addresses
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
          {session && (
            <Button
              onClick={() => replace("/d")}
              variant="default"
              className="w-full"
            >
              Open Distribution
            </Button>
          )}
          <Button
            onClick={() => signOut()}
            variant="destructive"
            className="w-full"
          >
            Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  ) : (
    <Button onClick={() => signIn("google")}>Login</Button>
  );
});

UserComponent.displayName = "UserComponent";
export default UserComponent;
