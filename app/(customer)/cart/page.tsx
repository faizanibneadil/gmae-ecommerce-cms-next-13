import { getServerSession } from "next-auth";
import { getCartItems } from "./_queries";
import { authOptions } from "@/config/authOptions";
import Image from "next/image";
import IncrementToCart from "./_components/inc-to-cart-button";
import DecrementToCart from "./_components/dec-to-cart";
import RemoveToCart from "./_components/remove-to-cart";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const { cart } = await getCartItems(session?.user.id);
  return (
    <div className="max-w-4xl mx-auto my-6">
      {cart?.items.map((item) => {
        const id = item.products?.id;
        const key = item.products?.id;
        const image = item.products?.images[0].src;
        const name = item.products?.title;
        const qty = item.quantity;
        const regularPrice = item.products?.regularPrice;
        const salePrice = item?.products?.salePrice;
        const discount = Number(regularPrice) - Number(salePrice);
        const subTotal =
          Number(qty) * Number(salePrice) ?? Number(regularPrice);
        return (
          <div key={key} className="grid grid-cols-12 gap-2">
            <div className="col-span-2">
              <div className="relative h-20">
                <Image
                  src={`https://lh3.googleusercontent.com/d/${image}=s420`}
                  alt=""
                  fill
                  className="object-contain w-full"
                />
              </div>
            </div>
            <div className="col-span-10">
              <h2 className="font-semibold line-clamp-2">{name}</h2>
              <div className="flex flex-col justify-between md:flex-row item-center">
                <p className="text-sm">Quantity: {qty}</p>
                <p className="text-sm">Price: {regularPrice}</p>
                <p className="text-sm">Discount: {discount}</p>
                <p className="text-sm">Sub Total: {subTotal}</p>
              </div>
              <div className="flex mt-4 space-x-2">
                <IncrementToCart productId={id} userId={session?.user.id} />
                <DecrementToCart />
                <RemoveToCart />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
