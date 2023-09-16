import { TruckIcon } from "@/app/_components/icons";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/config/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache, memo, use } from "react";

const getOrders = cache(async () => {
  const orders = await prisma.orders.findMany({
    include: {
      _count: {
        select: {
          orderItems: true,
        },
      },
      status: true,
    },
  });
  return orders;
});

const getStatuses = cache(async () => {
  const statuses = await prisma.orderStatuses.findMany();
  return statuses;
});

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type TOrders = UnwrapPromise<ReturnType<typeof getOrders>>;
type TStatuses = UnwrapPromise<ReturnType<typeof getStatuses>>;

const Page: React.FC<{}> = memo(() => {
  const orders = use(getOrders());
  const statuses = use(getStatuses());
  return orders?.length ? (
    <Orders orders={orders} statuses={statuses} />
  ) : (
    notFound()
  );
});
Page.displayName = "Page";
export default Page;

// Orders

const Orders: React.FC<{ orders: TOrders; statuses: TStatuses }> = memo(
  ({ orders, statuses }) => {
    return orders.map((order) => (
      <OrderItem key={order.id} order={order} statuses={statuses} />
    ));
  }
);
Orders.displayName = "Orders";

// Orders Items

const OrderItem: React.FC<{ order: TOrders[number]; statuses: TStatuses }> =
  memo(({ order, statuses }) => {
    return (
      <Link
        key={order.id}
        href={`/admin/orders/${order.id}`}
        className="flex flex-row items-center justify-between p-4 my-2 border rounded-lg"
      >
        <div className="flex items-center space-x-2">
          <TruckIcon />
          <div className="space-y-0.5">
            <h2 className="text-base">
              <Badge variant="secondary">{order._count.orderItems}</Badge> Items
            </h2>
            <div className="flex flex-row items-center space-x-2">
              <Badge>Total: {order.total}</Badge>
              <Badge>Discount: {order.discount}</Badge>
            </div>
          </div>
        </div>
      </Link>
    );
  });
OrderItem.displayName = "OrderItem";
