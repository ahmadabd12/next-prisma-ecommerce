import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { productSchema } from "@/lib/validators";
import { slugify } from "@/lib/utils";

export async function GET() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json({ products });
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const body = productSchema.parse(await request.json());
    const product = await prisma.product.create({
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
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to create product" }, { status: 400 });
  }
}
