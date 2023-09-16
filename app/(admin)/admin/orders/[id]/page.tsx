import { prisma } from "@/config/db";
import { cache, memo, use } from "react";
import CancelOrderButton from "./_components/cancel-order-button";
import { notFound } from "next/navigation";
import OrderStatus from "./_components/order-status";
import OrderSummery from "./_components/order-summery";
import OrderItems from "./_components/order-items";

const getOrderById = cache(async (orderId: string) => {
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
    where: { id: orderId },
  });
  return order;
});

const getStatuses = cache(async (orderId: string) => {
  const statuses = await prisma.orderStatuses.findMany({
    select: {
      _count: {
        select: {
          orders: true,
        },
      },
      id: true,
      name: true,
      orders: {
        select: {
          id: true,
        },
        where: {
          id: orderId,
        },
      },
    },
  });
  return statuses;
});

const Page: React.FC<{
  params: { id: string };
}> = memo(({ params }) => {
  const order = use(getOrderById(params.id));
  const statuses = use(getStatuses(params.id));
  const isPending = order?.status.name === "PENDING";
  const isProcessing = order?.status.name === "PROCESSING";
  const isOnHold = order?.status.name === "ON_HOLD";
  const isCancelOrder = isPending || isProcessing || isOnHold;
  return order ? (
    <div className="flex flex-col items-center justify-center mt-4">
      <OrderStatus statuses={statuses} />
      <OrderSummery discount={order.discount} total={order.total} />
      <OrderItems items={order.orderItems} />
      {isCancelOrder && <CancelOrderButton />}
    </div>
  ) : (
    notFound()
  );
});

Page.displayName = "Page";

export default Page;
