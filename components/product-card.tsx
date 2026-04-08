"use client";

import { currency } from "@/lib/utils";

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string | null;
    stock: number;
    category: { name: string };
  };
};

export function ProductCard({ product }: ProductCardProps) {
  function addToCart() {
    const existing = JSON.parse(localStorage.getItem("cart") || "[]") as Array<{ productId: string; quantity: number }>;
    const index = existing.findIndex((item) => item.productId === product.id);

    if (index >= 0) {
      existing[index].quantity += 1;
    } else {
      existing.push({ productId: product.id, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existing));
    alert("Added to cart");
  }

  return (
    <div className="surface p-4 shadow-sm">
      <div
        className="mb-3 h-44 rounded-lg bg-gray-100 bg-cover bg-center"
        style={{ backgroundImage: product.imageUrl ? `url(${product.imageUrl})` : undefined }}
      />
      <p className="badge-muted mb-1">{product.category.name}</p>
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="mt-2 text-sm text-gray-600">{product.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="font-bold">{currency(product.price)}</span>
        <button onClick={addToCart} className="btn-primary text-sm">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
