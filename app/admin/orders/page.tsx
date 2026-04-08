"use client";

import { useEffect, useState } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data.orders || []));
  }, []);

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/orders/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    setOrders((current) => current.map((order) => (order.id === id ? { ...order, status } : order)));
  }

  return (
    <div className="space-y-6">
      <h1 className="mb-6 text-3xl font-bold">Manage Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="surface p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Order #{order.id.slice(-8)}</h3>
                <p className="text-sm text-gray-500">{order.user.name} · {order.user.email}</p>
              </div>
              <select value={order.status} onChange={(e) => updateStatus(order.id, e.target.value)} className="rounded border px-3 py-2">
                {['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <p className="text-sm text-gray-600">{order.shippingAddress}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
