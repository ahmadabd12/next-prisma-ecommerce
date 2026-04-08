import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { categorySchema } from "@/lib/validators";
import { slugify } from "@/lib/utils";

export async function GET() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json({ categories });
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const body = categorySchema.parse(await request.json());
    const category = await prisma.category.create({
      data: {
        name: body.name,
        slug: slugify(body.name)
      }
    });
    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to create category" }, { status: 400 });
  }
}
