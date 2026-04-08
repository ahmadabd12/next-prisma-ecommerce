import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { currency } from "@/lib/utils";
import { AdminProductForm } from "@/components/admin-product-form";
import { DeleteButton } from "@/components/delete-button";

export default async function AdminProductsPage() {
  await requireAdmin();
  const [products, categories] = await Promise.all([
    prisma.product.findMany({ include: { category: true }, orderBy: { createdAt: "desc" } }),
    prisma.category.findMany({ orderBy: { name: "asc" } })
  ]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
      <div className="space-y-4">
        <h1 className="mb-4 text-2xl font-bold">Create Product</h1>
        <div className="surface p-4">
          <AdminProductForm categories={categories} />
        </div>
      </div>
      <div>
        <h2 className="mb-4 text-2xl font-bold">Product List</h2>
        <div className="space-y-3">
          {products.map((product) => (
            <div key={product.id} className="surface p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category.name} · {currency(product.price)} · stock {product.stock}</p>
                  <p className="mt-2 text-sm text-gray-700">{product.description}</p>
                </div>
                <DeleteButton url={`/api/products/${product.id}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
