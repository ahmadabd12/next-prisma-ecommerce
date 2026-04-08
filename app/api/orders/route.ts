import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createOrderSchema } from "@/lib/validators";
import { requireUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await requireUser();
    const orders = await prisma.order.findMany({
      where: user.role === "ADMIN" ? {} : { userId: user.id },
      include: {
        user: { select: { id: true, name: true, email: true } },
        items: { include: { product: true } }
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ orders });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireUser();
    const body = createOrderSchema.parse(await request.json());

    const productIds = body.items.map((item) => item.productId);
    const products = await prisma.product.findMany({ where: { id: { in: productIds } } });

    const items = body.items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) throw new Error(`Product not found: ${item.productId}`);
      if (product.stock < item.quantity) throw new Error(`Not enough stock for ${product.name}`);

      return {
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: product.price
      };
    });

    const totalAmount = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

    const order = await prisma.$transaction(async (tx) => {
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } }
        });
      }

      return tx.order.create({
        data: {
          userId: user.id,
          shippingAddress: body.shippingAddress,
          totalAmount,
          items: {
            create: items
          }
        }
      });
    });

    return NextResponse.json({ orderId: order.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to create order" }, { status: 400 });
  }
}
