"use client";

import { useEffect, useMemo, useState } from "react";
import { currency } from "@/lib/utils";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

export function CartClient({ products }: { products: Product[] }) {
  const [cart, setCart] = useState<Array<{ productId: string; quantity: number }>>([]);
  const [shippingAddress, setShippingAddress] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  const items = useMemo(() => {
    return cart
      .map((item) => ({
        ...item,
        product: products.find((product) => product.id === item.productId)
      }))
      .filter((item) => item.product);
  }, [cart, products]);

  const total = items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

  async function checkout() {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shippingAddress,
        items: cart
      })
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.removeItem("cart");
      setCart([]);
      setMessage(`Order created: ${data.orderId}`);
    } else {
      setMessage(data.error || "Checkout failed");
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="rounded-xl border bg-white p-4">
        <h2 className="mb-4 text-xl font-semibold">Cart Items</h2>
        <div className="space-y-3">
          {items.length === 0 && <p>Your cart is empty.</p>}
          {items.map((item) => (
            <div key={item.productId} className="flex items-center justify-between rounded border p-3">
              <div>
                <h3 className="font-medium">{item.product?.name}</h3>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p>{currency((item.product?.price || 0) * item.quantity)}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl border bg-white p-4">
        <h2 className="mb-4 text-xl font-semibold">Checkout</h2>
        <textarea value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} placeholder="Shipping address" className="mb-4 min-h-32 w-full rounded border px-3 py-2" />
        <p className="mb-4 font-semibold">Total: {currency(total)}</p>
        <button onClick={checkout} className="w-full rounded bg-black px-4 py-2 text-white">Place Order</button>
        {message && <p className="mt-3 text-sm">{message}</p>}
      </div>
    </div>
  );
}
