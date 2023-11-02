import { Badge } from "@/components/ui/badge";
import { memo, use } from "react";
import BillingProducts from "./_components/billing-products";
import { Button } from "@/components/ui/button";
import { _getBillByBillId } from "@/queries";

interface Props {
  params: { id: string };
}

const Page: React.FC<Props> = memo(({ params }) => {
  const bill = use(_getBillByBillId(params.id));
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
