import { prisma } from "@/config/db";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache, memo, use } from "react";
import ReOrderButton from "./_components/re-order-button";
import CancelOrderButton from "./_components/cancel-order-button";
import OrderStatus from "./_components/order-status";
import OrderSummery from "./_components/order-summery";
import OrderItems from "./_components/order-items";

type FetchProps = {
  orderId: string;
  userId: string | undefined;
};

const getOrderByOrderIdAndUserId = cache(
  async ({ orderId, userId }: FetchProps) => {
    const order = await prisma.orders.findUnique({
      select: {
        _count: {
          select: {
            orderItems: true,
          },
        },
        id: true,
        createdAt: true,
        discount: true,
        total: true,
        address: {
          select: {
            id: true,
            apartment: true,
            city: true,
            label: true,
            phone: true,
            postalCode: true,
            province: true,
            streetAddress1: true,
            streetAddress2: true,
          },
        },
        status: {
          select: {
            id: true,
            name: true,
          },
        },
        orderItems: {
          select: {
            id: true,
            discount: true,
            subtotal: true,
            quantity: true,
            Products: {
              select: {
                id: true,
                title: true,
                images: {
                  select: {
                    src: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
      where: { id: orderId, User: { id: userId } },
    });
    return order;
  }
);

type TOrder = Awaited<ReturnType<typeof getOrderByOrderIdAndUserId>>;

const Page: React.FC<{
  params: { id: string };
}> = memo(({ params }) => {
  const session = use(getServerSession());
  const order = use(
    getOrderByOrderIdAndUserId({
      orderId: params.id,
      userId: session?.user.id,
    })
  );
  const isCancelled = order?.status.name === "CANCELLED";
  const isReturned = order?.status.name === "RETURNED";
  const isDelivered = order?.status.name === "DELIVERED";
  const isReOrder = isCancelled || isReturned || isDelivered;
  const isPending = order?.status.name === "PENDING";
  const isProcessing = order?.status.name === "PROCESSING";
  const isOnHold = order?.status.name === "ON_HOLD";
  const isCancelOrder = isPending || isProcessing || isOnHold;
  return order ? (
    <div className="flex flex-col items-center justify-center mt-4">
      <OrderStatus status={order.status} statusWillChange={isCancelOrder} />
      <OrderSummery discount={order.discount} total={order.total} />
      <OrderItems items={order.orderItems} />
      {isReOrder ? <ReOrderButton /> : <CancelOrderButton />}
    </div>
  ) : (
    notFound()
  );
});

Page.displayName = "Page";
export default Page;
