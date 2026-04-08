import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validators";
import { signToken, setAuthCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const body = loginSchema.parse(Object.fromEntries(formData.entries()));

    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const valid = await bcrypt.compare(body.password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = signToken({ userId: user.id, role: user.role, email: user.email });
    const response = NextResponse.redirect(new URL(user.role === "ADMIN" ? "/admin" : "/shop", request.url));
    setAuthCookie(response, token);
    return response;
  } catch {
    return NextResponse.json({ error: "Invalid login data" }, { status: 400 });
  }
}
