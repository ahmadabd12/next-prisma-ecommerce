import Link from "next/link";
import { requireAdmin } from "@/lib/auth";

export default async function AdminPage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2 text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-gray-600">
          Manage products, categories, and customer orders from a single place.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/admin/products" className="surface p-6 font-semibold">
          Manage Products
        </Link>
        <Link href="/admin/categories" className="surface p-6 font-semibold">
          Manage Categories
        </Link>
        <Link href="/admin/orders" className="surface p-6 font-semibold">
          Manage Orders
        </Link>
      </div>
    </div>
  );
}
