"use client";

import { useState } from "react";

export function AdminCategoryForm({ category }: { category?: { id: string; name: string } }) {
  const [message, setMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    const payload = Object.fromEntries(formData.entries());
    const method = category?.id ? "PUT" : "POST";
    const url = category?.id ? `/api/categories/${category.id}` : "/api/categories";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    setMessage(response.ok ? "Saved successfully" : data.error || "Something went wrong");
    if (response.ok) window.location.reload();
  }

  return (
    <form action={handleSubmit} className="grid gap-3 rounded-xl border bg-white p-4">
      <input name="name" defaultValue={category?.name} placeholder="Category name" className="rounded border px-3 py-2" required />
      <button className="rounded bg-black px-4 py-2 text-white">{category?.id ? "Update" : "Create"} Category</button>
      {message && <p className="text-sm text-gray-700">{message}</p>}
    </form>
  );
}
