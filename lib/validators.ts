import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const categorySchema = z.object({
  name: z.string().min(2)
});

export const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  price: z.coerce.number().positive(),
  stock: z.coerce.number().int().min(0),
  categoryId: z.string().min(1),
  imageUrl: z.string().url().optional().or(z.literal("")),
  featured: z.coerce.boolean().optional()
});

export const createOrderSchema = z.object({
  shippingAddress: z.string().min(10),
  items: z.array(z.object({
    productId: z.string().min(1),
    quantity: z.coerce.number().int().positive()
  })).min(1)
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"])
});
