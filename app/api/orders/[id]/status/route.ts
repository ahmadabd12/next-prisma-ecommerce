import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { updateOrderStatusSchema } from "@/lib/validators";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = updateOrderStatusSchema.parse(await request.json());
    const order = await prisma.order.update({
      where: { id },
      data: { status: body.status }
    });
    return NextResponse.json({ order });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to update order status" }, { status: 400 });
  }
}
