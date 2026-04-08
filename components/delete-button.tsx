"use client";

export function DeleteButton({ url }: { url: string }) {
  async function removeItem() {
    const ok = confirm("Are you sure?");
    if (!ok) return;

    const response = await fetch(url, { method: "DELETE" });
    if (response.ok) window.location.reload();
  }

  return <button onClick={removeItem} className="rounded bg-red-600 px-3 py-2 text-white">Delete</button>;
}
