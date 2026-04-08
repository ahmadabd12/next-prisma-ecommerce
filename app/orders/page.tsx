import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { currency } from "@/lib/utils";

export default async function OrdersPage() {
  const user = await requireUser();
  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: {
      items: {
        include: { product: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="mb-6 text-3xl font-bold">My Orders</h1>
      <div className="space-y-4">
        {orders.map((order: any) => (
          <div key={order.id} className="surface p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="font-semibold">Order #{order.id.slice(-8)}</p>
                <p className="text-sm text-gray-500">Status: {order.status}</p>
              </div>
              <p className="font-bold">{currency(order.totalAmount)}</p>
            </div>
            <div className="space-y-2 text-sm">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.product.name} x {item.quantity}
                  </span>
                  <span>{currency(item.unitPrice * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
