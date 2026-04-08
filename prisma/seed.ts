import bcrypt from "bcryptjs";
import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("Admin@123", 10);
  const customerPassword = await bcrypt.hash("Customer@123", 10);

  const electronics = await prisma.category.upsert({
    where: { slug: "electronics" },
    update: {},
    create: { name: "Electronics", slug: "electronics" }
  });

  const fashion = await prisma.category.upsert({
    where: { slug: "fashion" },
    update: {},
    create: { name: "Fashion", slug: "fashion" }
  });

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@example.com",
      passwordHash: adminPassword,
      role: Role.ADMIN
    }
  });

  await prisma.user.upsert({
    where: { email: "customer@example.com" },
    update: {},
    create: {
      name: "Customer",
      email: "customer@example.com",
      passwordHash: customerPassword,
      role: Role.CUSTOMER
    }
  });

  const products = [
    {
      name: "Wireless Headphones",
      slug: "wireless-headphones",
      description: "Noise-cancelling over-ear headphones.",
      price: 129.99,
      stock: 15,
      featured: true,
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      categoryId: electronics.id
    },
    {
      name: "Smart Watch",
      slug: "smart-watch",
      description: "Fitness tracking and notifications.",
      price: 199.99,
      stock: 20,
      featured: true,
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      categoryId: electronics.id
    },
    {
      name: "Classic Hoodie",
      slug: "classic-hoodie",
      description: "Soft cotton hoodie for daily wear.",
      price: 49.99,
      stock: 30,
      featured: false,
      imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      categoryId: fashion.id
    }
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
