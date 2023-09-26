"use client";

import useCart from "@/store/cart-store";
import Image from "next/image";
import IncrementToCart from "./inc-to-cart-button";
import DecrementToCart from "./dec-to-cart";
import RemoveToCart from "./remove-to-cart";
import { priceFormatter } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CartItems: React.FC<{ checkout: boolean }> = ({ checkout }) => {
  const { push } = useRouter();
  const items = useCart((state) => state.items);
  return items?.length ? (
    <div>
      <div className="mb-6 divide-y divide-gray-200 dark:divide-gray-700">
        {items?.map((p) => (
          <div key={p.id} className="px-3 py-1">
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
                  <p className="text-sm font-medium line-clamp-3">
                    <span className="text-destructive">{p.qty}</span> x{" "}
                    {p.title}
                  </p>
                  <p className="text-sm font-medium text-destructive">
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
                    <IncrementToCart product={p} />
                    <DecrementToCart productId={p.id} />
                    <RemoveToCart productId={p.id} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {checkout && (
        <Button onClick={() => push("/checkout")} className="w-full">
          Checkout
        </Button>
      )}
    </div>
  ) : (
    <div>Items not found.</div>
  );
};

export default CartItems;
