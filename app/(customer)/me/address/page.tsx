import { Badge } from "@/components/ui/badge";
import { prisma } from "@/config/db";
import { notFound } from "next/navigation";
import { cache, memo, use } from "react";
import EditAddress from "./_components/edit-address-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AddNewAddress from "./_components/Init-address";
import { AddressIcon } from "@/app/_components/icons";

const getAddress = cache(async () => {
  const address = await prisma.userAddresses.findMany();
  return address;
});

const Page: React.FC<{}> = memo(() => {
  const address = use(getAddress());
  return address?.length ? (
    <div>
      <AddNewAddress />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 mt-2">
        {address?.map((adrs) => (
          <div
            key={adrs.id}
            className="flex flex-row items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex flex-row items-center space-x-2">
              <AddressIcon />
              <div className="flex flex-col space-y-1">
                <h2 className="text-base">{adrs.streetAddress1}</h2>
                <div className="flex flex-row space-x-2">
                  <Badge>{adrs.label}</Badge>
                </div>
              </div>
            </div>
            <EditAddress id={adrs.id} />
          </div>
        ))}
      </div>
    </div>
  ) : (
    notFound()
  );
});
Page.displayName = "Page";
export default Page;
