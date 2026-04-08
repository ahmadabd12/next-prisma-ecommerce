import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdminCategoryForm } from "@/components/admin-category-form";
import { DeleteButton } from "@/components/delete-button";

export default async function AdminCategoriesPage() {
  await requireAdmin();
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: "asc" }
  });

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
      <div className="space-y-4">
        <h1 className="mb-4 text-2xl font-bold">Create Category</h1>
        <div className="surface p-4">
          <AdminCategoryForm />
        </div>
      </div>
      <div>
        <h2 className="mb-4 text-2xl font-bold">Category List</h2>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between surface p-4">
              <div>
                <h3 className="font-semibold">{category.name}</h3>
                <p className="text-sm text-gray-500">Products: {category._count.products}</p>
              </div>
              <DeleteButton url={`/api/categories/${category.id}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
