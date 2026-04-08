import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

export async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-slate-900">
          PrismaShop
        </Link>
        <nav className="flex items-center gap-4 text-sm text-slate-700">
          <Link href="/shop">Shop</Link>
          <Link href="/cart">Cart</Link>
          {user && <Link href="/orders">My Orders</Link>}
          {user?.role === "ADMIN" && <Link href="/admin">Admin</Link>}
          {!user ? (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          ) : (
            <form action="/api/auth/logout" method="post">
              <button className="btn-primary px-3 py-2">Logout</button>
            </form>
          )}
        </nav>
      </div>
    </header>
  );
}
