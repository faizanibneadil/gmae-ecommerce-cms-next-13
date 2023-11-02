import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";
import { Suspense, cache, memo, use } from "react";
import { prisma } from "@/config/db";
import CartItems from "./_components/cart-items";
import CartSummary from "./_components/cart-summary";
import CartAddress from "./_components/cart-address";
import { Button } from "@/components/ui/button";
import PlaceOrder from "./_components/place-order";

const getAddress = cache(async (userId: string | undefined) => {
  const address = await prisma.userAddresses.findMany({
    where: { User: { id: userId } },
  });
  return address;
});

const Page: React.FC<{}> = memo(() => {
  const session = use(getServerSession(authOptions));
  const address = use(getAddress(session?.user.id));
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <div className="flex flex-col max-w-4xl mx-auto space-y-2">
        <CartItems checkout={false} />
        <CartSummary />
        <CartAddress address={address} />
        <PlaceOrder session={session} />
      </div>
    </Suspense>
  );
});

Page.displayName = "Page";
export default Page;
