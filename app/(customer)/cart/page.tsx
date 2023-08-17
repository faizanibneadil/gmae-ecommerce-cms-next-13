import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";
import Image from "next/image";
import IncrementToCart from "./_components/inc-to-cart-button";
import DecrementToCart from "./_components/dec-to-cart";
import RemoveToCart from "./_components/remove-to-cart";
import { cache, memo, use } from "react";
import { prisma } from "@/config/db";
import { notFound } from "next/navigation";
import {
  Button,
  Card,
  Icon,
  List,
  ListItem,
  Text,
  TextInput,
} from "@tremor/react";
import Link from "next/link";
import { priceFormatter } from "@/lib/utils";

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

const getLocations = cache(async () => {
  const locations = await prisma.deliveryLocations.findMany();
  return locations;
});

const Page: React.FC<Props> = () => {
  const locations = use(getLocations());
  const session = use(getServerSession(authOptions));
  const cart = use(getItems(session?.user.id));
  const discount = cart?.items?.reduce((p, n) => {
    const qty = Number(n?.quantity);
    const rp = Number(n?.products?.regularPrice);
    const sp = Number(n?.products?.salePrice);
    const disc = p + qty * rp - sp;
    return disc;
  }, 0);
  const subtotal = cart?.items?.reduce((p, n) => {
    const qty = Number(n?.quantity);
    const sp = Number(n?.products?.salePrice);
    const rp = Number(n?.products?.regularPrice);
    const sub = p + qty * sp ?? rp;
    return sub;
  }, 0);
  return (
    <div className="grid grid-cols-1 gap-2 my-4 md:grid-cols-2">
      <div>
        <Text>My Cart.</Text>
        <Card className="w-full p-0 mx-auto rounded-none">
          <div className="flow-root">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {!!cart?.items?.length
                ? cart?.items.map((item) => {
                    const id = item.products?.id;
                    const key = item.products?.id;
                    const image = item.products?.images[0].src;
                    const name = item.products?.title;
                    const qty = Number(item.quantity);
                    const regularPrice = Number(item.products?.regularPrice);
                    const salePrice = Number(item?.products?.salePrice);
                    const discount = qty * (regularPrice - salePrice);
                    const subTotal = qty * salePrice ?? regularPrice;
                    return (
                      <li className="px-3 py-1" key={id}>
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="relative w-8 h-8 rounded-full shadow-lg">
                              <Image
                                key={image}
                                alt=""
                                fill
                                sizes="100vw"
                                className="object-contain rounded-full"
                                src={`https://lh3.googleusercontent.com/d/${image}=s220`}
                              />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900 line-clamp-3">
                                {qty} x {name}
                              </p>
                              <p className="text-sm font-medium text-gray-900">
                                {priceFormatter.format(
                                  salePrice ?? regularPrice
                                )}
                              </p>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <p className="text-xs">Discount: {discount}</p>
                                <p className="text-xs">Sub Total: {subTotal}</p>
                              </div>
                              <div className="flex items-center space-x-1">
                                <IncrementToCart
                                  productId={id}
                                  userId={session?.user.id}
                                />
                                <DecrementToCart
                                  productId={id}
                                  userId={session?.user.id}
                                />
                                <RemoveToCart
                                  productId={id}
                                  userId={session?.user.id}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })
                : notFound()}
            </ul>
          </div>
        </Card>
        <Card className="w-full p-0 mx-auto mt-2 rounded-none">
          <List className="px-2">
            <ListItem>
              <span>Discount:</span>
              <span>{discount}</span>
            </ListItem>
            <ListItem>
              <span>Delivery Charges:</span>
              <span>0</span>
            </ListItem>
            <ListItem>
              <span>Subtotal:</span>
              <span>{subtotal}</span>
            </ListItem>
          </List>
        </Card>
      </div>
      <div>
        <form className="flex flex-col space-y-2">
          <div>
            <Text>Receiver Name.</Text>
            <TextInput name="name" type="text" />
          </div>
          <div>
            <Text>Receiver Email.</Text>
            <TextInput name="email" type="email" />
          </div>
          <div>
            <Text>Receiver Address.</Text>
            <TextInput name="address" type="text" />
          </div>
          <div>
            <select>
              <option>Choose any one location.</option>
              {locations?.map((loc) => (
                <option key={loc.id}>{loc.location}</option>
              ))}
            </select>
          </div>
          <Button type="submit">Place Order</Button>
        </form>
      </div>
    </div>
  );
};

const MemoizedPage = memo(Page);
export default MemoizedPage;
