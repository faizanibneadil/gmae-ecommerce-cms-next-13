import { TruckIcon } from "@/app/_components/icons";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/config/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cache, memo, use } from "react";
import OrderFilter from "./_components/orders-filter";

const getOrders = cache(async (statusId: string | undefined) => {
  const orders = await prisma.orders.findMany({
    select: {
      _count: {
        select: {
          orderItems: true,
        },
      },
      id: true,
      createdAt: true,
      status: {
        select: {
          name: true,
        },
      },
    },
    where: { status: { id: statusId } },
    orderBy: { createdAt: "desc" },
  });
  return orders;
});

type TOrders = Awaited<ReturnType<typeof getOrders>>;

const getStatuses = cache(async () => {
  const statuses = await prisma.orderStatuses.findMany({
    include: { _count: { select: { orders: true } } },
  });
  return statuses;
});

const Page: React.FC<{
  searchParams: { [key: string]: string | undefined };
}> = memo(({ searchParams }) => {
  const statuses = use(getStatuses());
  const PENDING_ID = statuses.find((s) => s.name === "PENDING")?.id;
  if (!searchParams?.statusId) redirect(`/admin/orders?statusId=${PENDING_ID}`);
  const orders = use(getOrders(searchParams?.statusId));
  return (
    <div className="flex flex-col space-y-2">
      <OrderFilter statuses={statuses} OpenStatus={searchParams?.statusId} />
      {orders.length ? <Orders orders={orders} /> : <OrderNotFound />}
    </div>
  );
});
Page.displayName = "Page";
export default Page;

// Orders

const Orders: React.FC<{ orders: TOrders }> = memo(({ orders }) => {
  return orders.map((order) => <OrderItem key={order.id} order={order} />);
});
Orders.displayName = "Orders";

// Orders Items

const OrderItem: React.FC<{ order: TOrders[number] }> = memo(({ order }) => {
  return (
    <Link
      key={order.id}
      href={`/admin/orders/${order.id}`}
      className="flex flex-row items-center justify-between p-4 my-2 border rounded-lg"
    >
      <div className="flex items-center space-x-2">
        <TruckIcon />
        <div className="space-y-0.5">
          <h2 className="text-base">{order._count.orderItems} Items</h2>
        </div>
      </div>
      <div className="flex flex-col items-center md:flex-row gap-x-1 gap-y-1">
        <Badge>{order.createdAt.toLocaleDateString()}</Badge>
        <Badge variant="destructive">{order.status?.name}</Badge>
      </div>
    </Link>
  );
});
OrderItem.displayName = "OrderItem";

const OrderNotFound: React.FC<{}> = memo(() => {
  return (
    <div className="flex items-center justify-center w-full h-40 mt-4 border rounded-md">
      <p className="text-muted-foreground">Orders Not Found.</p>
    </div>
  );
});
OrderNotFound.displayName = "OrderNotFound";
