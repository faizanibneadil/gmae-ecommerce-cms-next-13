"use client";
import Logout from "@/app/_components/logout";
import { Card } from "@/components/ui/card";
import { MenuIcon, User } from "lucide-react";
import { memo, useTransition } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Menu: React.FC<{
  session: Session;
}> = memo(({ session }) => {
  const { push } = useRouter();
  const [pending, start] = useTransition();
  const route = (path: string) => start(() => push(path));
  return (
    <Card className="flex flex-row items-center justify-between px-4 py-4">
      <div className="font-bold">TechChowk</div>
      <Sheet>
        <SheetTrigger>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="max-w-3xl p-0 pb-4 mx-auto border-l border-r rounded-t"
        >
          <SheetHeader className="relative flex items-center justify-center -top-10">
            <Avatar className="w-20 h-20">
              <AvatarImage src={session?.user?.image?.toString()} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center space-y-1">
            <div className="font-semibold">{session.user.name}</div>
            <div className="text-sm font-semibold text-muted-foreground">
              {session.user.email}
            </div>
          </div>
          <div className="flex flex-col mt-4 space-y-1">
            <Button
              disabled={pending}
              onClick={() => route("/bookers")}
              className="w-full rounded-none"
              variant="secondary"
            >
              Orders
            </Button>
            <Button
              disabled={pending}
              onClick={() => route("/open-shop")}
              className="w-full rounded-none"
              variant="secondary"
            >
              Inventory
            </Button>
            <Button
              disabled={pending}
              onClick={() => route("/open-shop")}
              className="w-full rounded-none"
              variant="secondary"
            >
              Categories
            </Button>
            <Button
              disabled={pending}
              onClick={() => route("/open-shop")}
              className="w-full rounded-none"
              variant="secondary"
            >
              Sliders
            </Button>
            <Button
              disabled={pending}
              onClick={() => route("/open-shop")}
              className="w-full rounded-none"
              variant="secondary"
            >
              Other Options
            </Button>
            <Logout />
          </div>
        </SheetContent>
      </Sheet>
    </Card>
  );
});
Menu.displayName = "Menu";
export default Menu;
