import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { categorySchema } from "@/lib/validators";
import { slugify } from "@/lib/utils";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = categorySchema.parse(await request.json());
    const category = await prisma.category.update({
      where: { id },
      data: { name: body.name, slug: slugify(body.name) }
    });
    return NextResponse.json({ category });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to update category" }, { status: 400 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to delete category" }, { status: 400 });
  }
}
