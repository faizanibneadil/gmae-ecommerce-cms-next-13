import { Badge } from "@/components/ui/badge";
import { prisma } from "@/config/db";
import { notFound } from "next/navigation";
import { cache, memo, use } from "react";

const getCustomers = cache(async () => {
  const customers = await prisma.user.findMany();
  return customers;
});

const Page: React.FC<{}> = memo(() => {
  const customers = use(getCustomers());
  return customers?.length ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
      {customers?.map((customer) => (
        <div
          key={customer.id}
          className="flex flex-row items-center justify-between p-4 border rounded-lg"
        >
          <div className="flex flex-col space-y-1">
            <h2 className="text-base">{customer.name}</h2>
            <div className="flex flex-row space-x-2">
              <Badge>{customer.role}</Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    notFound()
  );
});
Page.displayName = "Page";
export default Page;
