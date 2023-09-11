"use client";

import useCart from "@/store/cart-store";
import { Card, Text } from "@tremor/react";
import Image from "next/image";
import IncrementToCart from "../_components/inc-to-cart-button";
import DecrementToCart from "../_components/dec-to-cart";
import RemoveToCart from "../_components/remove-to-cart";
import { priceFormatter } from "@/lib/utils";
import { Session } from "next-auth";
import { Button } from "@/components/ui/button";

const CartItems: React.FC<{ session: Session | null }> = ({ session }) => {
  const items = useCart((state) => state.items);
  return items?.length ? (
    <Card className="w-full p-0 mx-auto rounded-none">
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {items?.map((p) => (
            <li key={p.id} className="px-3 py-1">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="relative w-8 h-8 rounded-full shadow-lg">
                    <Image
                      key={p.image}
                      alt=""
                      fill
                      sizes="100vw"
                      className="object-contain rounded-full"
                      src={`https://lh3.googleusercontent.com/d/${p.image}=s220`}
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 line-clamp-3">
                      {p.qty} x {p.title}
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {priceFormatter.format(
                        Number(p.salePrice) ?? Number(p.regularPrice)
                      )}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <p className="text-xs">Discount: {p.discount}</p>
                      <p className="text-xs">Sub Total: {p.subtotal}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <IncrementToCart
                        productId={p.id}
                        userId="{session?.user.id}"
                      />
                      <DecrementToCart
                        productId={p.id}
                        userId="{session?.user.id}"
                      />
                      <RemoveToCart
                        productId={p.id}
                        userId="{session?.user.id}"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Button className="w-full">Checkout</Button>
      </div>
    </Card>
  ) : (
    <div>Items not found.</div>
  );
};

export default CartItems;
