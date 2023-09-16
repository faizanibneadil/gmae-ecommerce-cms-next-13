import { TruckIcon } from "@/app/_components/icons";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/config/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache, memo, use } from "react";

const getOrdersByUserId = cache(async (id: string | undefined) => {
  const orders = await prisma.orders.findMany({
    where: { id },
    select: {
      _count: {
        select: {
          orderItems: true,
        },
      },
      id: true,
      createdAt: true,
      status: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return orders;
});

type TOrders = Awaited<ReturnType<typeof getOrdersByUserId>>;

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
