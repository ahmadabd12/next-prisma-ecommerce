import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product-card";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { featured: true },
    include: { category: true },
    take: 3,
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-gradient-to-r from-emerald-500 to-slate-900 px-8 py-16 text-white">
        <p className="mb-2 text-sm uppercase tracking-wide">Next.js + Prisma</p>
        <h1 className="max-w-2xl text-4xl font-bold">
          Full-stack e-commerce starter with admin and customer roles
        </h1>
        <p className="mt-4 max-w-2xl text-gray-100">
          Manage categories, products, and orders from the admin dashboard. Customers can register, shop, and checkout.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/shop" className="btn-secondary bg-white text-slate-900">
            Start Shopping
          </Link>
          <Link href="/admin" className="btn-primary border border-white/40 bg-transparent">
            Admin Dashboard
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link href="/shop" className="text-sm text-emerald-600 underline">
            View all
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
