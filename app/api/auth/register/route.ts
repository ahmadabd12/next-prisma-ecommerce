import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validators";
import { signToken, setAuthCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const body = registerSchema.parse(Object.fromEntries(formData.entries()));

    const exists = await prisma.user.findUnique({ where: { email: body.email } });
    if (exists) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        passwordHash,
        role: "CUSTOMER"
      }
    });

    const token = signToken({ userId: user.id, role: user.role, email: user.email });
    const response = NextResponse.redirect(new URL("/shop", request.url));
    setAuthCookie(response, token);
    return response;
  } catch {
    return NextResponse.json({ error: "Invalid registration data" }, { status: 400 });
  }
}
