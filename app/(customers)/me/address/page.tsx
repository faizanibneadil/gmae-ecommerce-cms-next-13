import { Badge } from "@/components/ui/badge";
import { prisma } from "@/config/db";
import { notFound } from "next/navigation";
import { Suspense, cache, memo, use } from "react";
import EditAddress from "./_components/edit-address-button";
import AddNewAddress from "./_components/Init-address";
import { AddressIcon } from "@/app/_components/icons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";

const getAddress = cache(async (userId: string | undefined) => {
  const address = await prisma.userAddresses.findMany({
    where: { User: { id: userId } },
  });
  return address;
});

type TAddress = Awaited<ReturnType<typeof getAddress>>;

const Page: React.FC<{}> = memo(() => {
  const session = use(getServerSession(authOptions));
  const addresses = use(getAddress(session?.user.id));
  return addresses?.length ? <Addresses addresses={addresses} /> : notFound();
});
Page.displayName = "Page";
export default Page;

const Addresses: React.FC<{ addresses: TAddress }> = memo(({ addresses }) => {
  return (
    <div>
      <AddNewAddress />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 mt-2">
        {addresses?.map((address) => (
          <Address key={address.id} address={address} />
        ))}
      </div>
    </div>
  );
});
Addresses.displayName = "Addresses";

const Address: React.FC<{ address: TAddress[number] }> = memo(({ address }) => {
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <div className="flex flex-row items-center justify-between p-4 border rounded-lg">
        <div className="flex flex-row items-center space-x-2">
          <AddressIcon />
          <div className="flex flex-col space-y-1">
            <h2 className="text-base">{address.streetAddress1}</h2>
            <div className="flex flex-row space-x-2">
              <Badge>{address.label}</Badge>
            </div>
          </div>
        </div>
        <EditAddress id={address.id} />
      </div>
    </Suspense>
  );
});
Address.displayName = "Address";
