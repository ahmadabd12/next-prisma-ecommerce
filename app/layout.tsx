import "./globals.css";
import { ReactNode } from "react";
import { Header } from "@/components/header";

export const metadata = {
  title: "PrismaShop",
  description: "Next.js e-commerce starter with Prisma"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
