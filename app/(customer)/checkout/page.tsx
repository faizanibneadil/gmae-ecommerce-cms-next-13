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
  Bold,
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
import CartItems from "./_components/items";
import CartSummary from "./_components/cart-summary";

interface Props {
  searchParams: { [key: string]: string };
  params: {};
}
const getLocations = cache(async () => {
  const locations = await prisma.deliveryLocations.findMany();
  return locations;
});

const Page: React.FC<Props> = ({ searchParams }) => {
  const locations = use(getLocations());
  const session = use(getServerSession(authOptions));
  return (
    <div className="grid grid-cols-1 gap-2 my-4 md:grid-cols-2">
      <div>
        <CartItems />
        <CartSummary />
      </div>
      <div>
        <form className="flex flex-col space-y-2">
          <div>
            <Text>Receiver Name.</Text>
            <TextInput
              name="name"
              type="text"
              defaultValue={session?.user.name?.toString()}
              required
            />
          </div>
          <div>
            <Text>Receiver Email.</Text>
            <TextInput
              name="email"
              type="email"
              defaultValue={session?.user.email?.toString()}
              required
            />
          </div>
          <div>
            <Text>Receiver Address.</Text>
            <TextInput
              name="address"
              type="text"
              placeholder="address"
              required
            />
          </div>
          <div>
            <Text>Receiver Phone Number.</Text>
            <TextInput
              name="phoneNumber"
              type="text"
              placeholder="Phone Number"
              required
            />
          </div>
          <div>
            <Text>Extra Note.</Text>
            <div className="tremor-TextInput-root relative w-full flex items-center min-w-[10rem] outline-none rounded-tremor-default shadow-tremor-input dark:shadow-dark-tremor-input bg-tremor-background dark:bg-dark-tremor-background hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-muted text-tremor-content dark:text-dark-tremor-content border-tremor-border dark:border-dark-tremor-border border">
              <textarea
                placeholder="Do not ring bell, If this number is going of then call me on this number xxxxxxxx"
                rows={4}
                className="tremor-TextInput-input resize-none w-full focus:outline-none focus:ring-0 border-none bg-transparent text-tremor-default text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pl-4 pr-4 py-2 placeholder:text-tremor-content dark:placeholder:text-dark-tremor-content"
                name="extraNote"
              ></textarea>
            </div>
          </div>

          <Button disabled={!Boolean(+searchParams?.rate)} type="submit">
            Place Order
          </Button>

          <Text>Only Cash on delivery service is available.</Text>
        </form>
      </div>
    </div>
  );
};

const MemoizedPage = memo(Page);
export default MemoizedPage;
