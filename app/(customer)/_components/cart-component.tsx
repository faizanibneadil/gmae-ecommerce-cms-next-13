"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { priceFormatter } from "@/lib/utils";
import useCart from "@/store/cart-store";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { memo } from "react";
import CartItems from "../checkout/_components/cart-items";
import { useSession } from "next-auth/react";

const CartComponent: React.FC<{}> = memo(() => {
  const items = useCart((state) => state.items);
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon">
          <ShoppingCart />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full px-1 pt-4 md:w-2/6">
        <SheetHeader className="flex flex-col items-center justify-center">
          <SheetTitle>My Shopping Cart.</SheetTitle>
          <SheetDescription>{items.length} Items</SheetDescription>
          <CartItems checkout />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
});

CartComponent.displayName = "CartComponent";
export default CartComponent;
