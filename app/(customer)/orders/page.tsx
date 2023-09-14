import { TruckIcon } from "@/app/_components/icons";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { prisma } from "@/config/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache, memo, use } from "react";

const getOrdersByUserId = cache(async (id: string | undefined) => {
  const orders = await prisma.orders.findMany({
    where: { id },
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

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type TOrders = UnwrapPromise<ReturnType<typeof getOrdersByUserId>>;

/**
 * Page Component
 */

const Page: React.FC<{}> = memo(() => {
  const session = use(getServerSession());
  const orders = use(getOrdersByUserId(session?.user.id));
  return orders?.length ? <Orders orders={orders} /> : notFound();
});
Page.displayName = "Page";
export default Page;

/**
 * Orders Components
 */

const Orders: React.FC<{ orders: TOrders }> = memo(({ orders }) => {
  return orders.map((order) => <OrderItem key={order.id} order={order} />);
});
Orders.displayName = "Orders";

/**
 * OrderItem Component
 */

const OrderItem: React.FC<{ order: TOrders[number] }> = memo(({ order }) => {
  return (
    <Link
      key={order.id}
      href={`/orders/${order.id}`}
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
      <Badge variant="destructive">{order.status?.name}</Badge>
    </Link>
  );
});
OrderItem.displayName = "OrderItem";
