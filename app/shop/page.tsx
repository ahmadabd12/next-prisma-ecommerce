import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product-card";

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Shop</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
