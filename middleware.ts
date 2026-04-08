import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = process.env.JWT_SECRET || "";
const secretKey = new TextEncoder().encode(SECRET);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  const pathname = request.nextUrl.pathname;

  if (
    !token &&
    (pathname.startsWith("/admin") || pathname.startsWith("/orders"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token) {
    try {
      console.log("Verifying token:", token);
      const { payload } = await jwtVerify(token, secretKey);
      console.log("Token payload:", payload);
      if (pathname.startsWith("/admin") && payload.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      console.error("Invalid token", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/orders/:path*"],
};
