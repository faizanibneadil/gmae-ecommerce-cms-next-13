import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";
import Image from "next/image";
import IncrementToCart from "./_components/inc-to-cart-button";
import DecrementToCart from "./_components/dec-to-cart";
import RemoveToCart from "./_components/remove-to-cart";
import { cache, memo, use } from "react";
import { prisma } from "@/config/db";
import { notFound } from "next/navigation";

interface Props {
  searchParams: { [key: string]: string };
  params: {};
}

const getItems = cache(async (userId: string | undefined) => {
  const cart = await prisma.cart.findUnique({
    select: {
      _count: {
        select: {
          items: true,
        },
      },
      items: {
        select: {
          quantity: true,
          products: {
            select: {
              id: true,
              title: true,
              regularPrice: true,
              salePrice: true,
              images: {
                select: {
                  id: true,
                  src: true,
                },
                take: 1,
              },
            },
          },
        },
      },
    },
    where: {
      userId: userId?.toString(),
    },
  });
  return cart;
});

const Page: React.FC<Props> = () => {
  const session = use(getServerSession(authOptions));
  const cart = use(getItems(session?.user.id));
  return !!cart?.items.length ? (
    <div className="my-6">
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
          Number(qty) * Number(regularPrice) ?? Number(salePrice);
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
                <DecrementToCart productId={id} userId={session?.user.id} />
                <RemoveToCart productId={id} userId={session?.user.id} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    notFound()
  );
};

const MemoizedPage = memo(Page);
export default MemoizedPage;
