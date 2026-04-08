import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { productSchema } from "@/lib/validators";
import { slugify } from "@/lib/utils";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = productSchema.parse(await request.json());
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        slug: slugify(body.name),
        description: body.description,
        price: body.price,
        stock: body.stock,
        imageUrl: body.imageUrl || null,
        featured: body.featured || false,
        categoryId: body.categoryId
      }
    });
    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to update product" }, { status: 400 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to delete product" }, { status: 400 });
  }
}
