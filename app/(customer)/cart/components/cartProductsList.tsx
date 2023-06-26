"use client";

import { RootState } from "@/store";
import { Button, Icon } from "@tremor/react";
import { Minus } from "lucide-react";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { addToCart, removeToCart } from "@/store/cartSlice";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export default function CartProductsList() {
  const cart = useSelector((state: RootState) => state.cart);
  const imageLoader = ({ src }: { src: string }) => {
    return `https://drive.google.com/uc?export=view&id=${src}`;
  };
  const dispatch = useDispatch();
  const addItem = useCallback((value: any) => dispatch(addToCart(value)), []);
  const removeItem = useCallback(
    (value: any) => dispatch(removeToCart(value)),
    []
  );
  return (
    <div>
      <div className="flow-root p-2">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {cart.items.map((item, idx) => {
            const images: any = item.images;
            return (
              <li key={idx} className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="relative self-start flex-shrink-0">
                    <Image
                      loader={imageLoader}
                      className="object-fill w-8 h-8 rounded-full"
                      width={8}
                      height={8}
                      alt=""
                      src={images[0].src}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900 md:text-sm line-clamp-3">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500 line-clamp-3">
                      Rs: {item.regularPrice} x Qty: {item.qty} = Subtotal:{" "}
                      {item.sub_total}, Discount: {item.discount}
                    </p>
                  </div>
                  <div className="flex flex-col items-center self-center justify-center md:flex-row">
                    <Icon
                      onClick={() => removeItem({ id: item.id })}
                      icon={Minus}
                      size="xs"
                      variant="shadow"
                    />
                    <div className="md:px-2">{item.qty}</div>
                    <Icon
                      onClick={() => addItem(item)}
                      icon={Plus}
                      size="xs"
                      variant="shadow"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="py-8 text-right rounded-xl">
          <h2>Sub Total: {cart.sub_total}</h2>
          <h2>Discount: {cart.discount}</h2>
          <h2>Total: {cart.total}</h2>
          ----------
          <h2>Total Items: {cart.total_qty}</h2>
        </div>
      </div>
    </div>
  );
}
