"use client";

import { useState } from "react";

type Category = { id: string; name: string };

type Product = {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  imageUrl?: string | null;
  featured?: boolean;
  categoryId?: string;
};

export function AdminProductForm({ categories, product }: { categories: Category[]; product?: Product }) {
  const [message, setMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    const payload = Object.fromEntries(formData.entries());
    const method = product?.id ? "PUT" : "POST";
    const url = product?.id ? `/api/products/${product.id}` : "/api/products";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        price: Number(payload.price),
        stock: Number(payload.stock),
        featured: payload.featured === "on"
      })
    });

    const data = await response.json();
    setMessage(response.ok ? "Saved successfully" : data.error || "Something went wrong");
    if (response.ok) window.location.reload();
  }

  return (
    <form action={handleSubmit} className="grid gap-3 rounded-xl border bg-white p-4">
      <input name="name" defaultValue={product?.name} placeholder="Product name" className="rounded border px-3 py-2" required />
      <textarea name="description" defaultValue={product?.description} placeholder="Description" className="rounded border px-3 py-2" required />
      <input name="price" type="number" step="0.01" defaultValue={product?.price} placeholder="Price" className="rounded border px-3 py-2" required />
      <input name="stock" type="number" defaultValue={product?.stock} placeholder="Stock" className="rounded border px-3 py-2" required />
      <input name="imageUrl" defaultValue={product?.imageUrl || ""} placeholder="Image URL" className="rounded border px-3 py-2" />
      <select name="categoryId" defaultValue={product?.categoryId} className="rounded border px-3 py-2" required>
        <option value="">Select category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
      <label className="flex items-center gap-2 text-sm">
        <input name="featured" type="checkbox" defaultChecked={product?.featured} /> Featured
      </label>
      <button className="rounded bg-black px-4 py-2 text-white">{product?.id ? "Update" : "Create"} Product</button>
      {message && <p className="text-sm text-gray-700">{message}</p>}
    </form>
  );
}
