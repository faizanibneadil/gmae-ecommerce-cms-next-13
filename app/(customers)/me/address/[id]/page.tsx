import { cache, memo, use } from "react";
import CreateUserAddressForm from "./_components/address-form";
import { prisma } from "@/config/db";

const getAddress = cache(async (id: string) => {
  const address = await prisma.userAddresses.findUnique({
    where: { id },
  });
  return address;
});

const Page: React.FC<{
  params: { id: string };
}> = memo(({ params }) => {
  const address = use(getAddress(params.id));
  return (
    <div className="max-w-3xl pb-4 mx-auto">
      <CreateUserAddressForm address={address} />
    </div>
  );
});
Page.displayName = "Page";
export default Page;
