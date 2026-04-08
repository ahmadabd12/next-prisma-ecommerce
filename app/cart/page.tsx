import { prisma } from "@/lib/prisma";
import { CartClient } from "@/components/cart-client";

export default async function CartPage() {
  const products = await prisma.product.findMany({
    select: { id: true, name: true, price: true, stock: true }
  });

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Cart</h1>
      <CartClient products={products} />
    </div>
  );
}
