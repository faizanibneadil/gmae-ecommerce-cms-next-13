import { Badge } from "@/components/ui/badge";
import { prisma } from "@/config/db";
import { cache, memo, use } from "react";
import BillingProducts from "./_components/billing-products";
import { Button } from "@/components/ui/button";
import CancelBill from "./_components/cancel-bill";

const getBillByBillId = cache(async (id: string) => {
  const bill = await prisma.billing.findUnique({
    select: {
      _count: {
        select: {
          items: true,
        },
      },
      id: true,
      isReturned: true,
      area: { select: { name: true } },
      booker: { select: { name: true } },
      company: { select: { name: true } },
      saleMane: { select: { name: true } },
      shop: { select: { name: true } },
      items: {
        select: {
          id: true,
          products: {
            select: {
              id: true,
              title: true,
              salePrice: true,
              regularPrice: true,
              profit: true,
            },
          },
          issueQuantity: true,
        },
      },
    },
    where: { id },
  });
  return bill;
});

const Page: React.FC<{
  params: { id: string };
}> = memo(({ params }) => {
  const bill = use(getBillByBillId(params.id));
  return (
    <div className="space-y-1">
      <div className="grid content-center grid-cols-1 gap-x-1 gap-y-1 md:grid-cols-2">
        <Button disabled variant="outline" className="justify-between w-full">
          {bill?.booker?.name}
          <Badge variant="secondary" className="text-[0.50rem]/[0.8rem] py-0.5">
            Booker
          </Badge>
        </Button>
        <Button disabled variant="outline" className="justify-between w-full">
          {bill?.saleMane?.name}
          <Badge variant="secondary" className="text-[0.50rem]/[0.8rem] py-0.5">
            Sale Man
          </Badge>
        </Button>
        <Button disabled variant="outline" className="justify-between w-full">
          {bill?.area?.name}
          <Badge variant="secondary" className="text-[0.50rem]/[0.8rem] py-0.5">
            Area
          </Badge>
        </Button>
        <Button disabled variant="outline" className="justify-between w-full">
          {bill?.shop?.name}
          <Badge variant="secondary" className="text-[0.50rem]/[0.8rem] py-0.5">
            Shop
          </Badge>
        </Button>
        <Button disabled variant="outline" className="justify-between w-full">
          {bill?.company?.name}
          <Badge variant="secondary" className="text-[0.50rem]/[0.8rem] py-0.5">
            Shop
          </Badge>
        </Button>
        <Button disabled variant="outline" className="justify-between w-full">
          {bill?._count.items}
          <Badge variant="secondary" className="text-[0.50rem]/[0.8rem] py-0.5">
            Items
          </Badge>
        </Button>
      </div>

      <BillingProducts isReturned={bill?.isReturned} products={bill?.items} />
    </div>
  );
});

Page.displayName = "Page";

export default Page;
