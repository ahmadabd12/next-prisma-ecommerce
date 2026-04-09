# Next.js + Prisma E-commerce Starter

Full-stack e-commerce starter using:

- Next.js App Router
- Prisma ORM
- SQLite for local development
- JWT cookie auth
- RBAC with `ADMIN` and `CUSTOMER`
- Server-side CRUD with Route Handlers

## Features

- Customer auth: register, login, logout
- Admin dashboard with CRUD for categories and products
- Customer cart and checkout
- Order creation and order history
- Protected admin API routes
- Prisma seed with demo data test

## Quick start

1. Copy env:
   ```bash
   cp .env.example .env
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Generate Prisma client and sync DB:
   ```bash
   npm run db:push
   ```
4. Seed demo data:
   ```bash
   npm run db:seed
   ```
5. Start dev server:
   ```bash
   npm run dev
   ```

## Demo accounts

- Admin: `admin@example.com` / `Admin@123`
- Customer: `customer@example.com` / `Customer@123`

## API routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/products`
- `POST /api/products` (admin)
- `PUT /api/products/:id` (admin)
- `DELETE /api/products/:id` (admin)
- `GET /api/categories`
- `POST /api/categories` (admin)
- `PUT /api/categories/:id` (admin)
- `DELETE /api/categories/:id` (admin)
- `GET /api/orders`
- `POST /api/orders`
- `PATCH /api/orders/:id/status` (admin)

## Notes

- This starter uses Route Handlers because Next.js App Router supports custom request handlers in `route.ts`. Next.js App Router docs and route handler docs describe this pattern. citeturn556742search0turn556742search2
- Prisma recommends creating a single Prisma Client instance pattern and using the Prisma schema as the central configuration. citeturn556742search19turn949706search5
- For RBAC, Auth.js documents passing role values via auth callbacks, but this project uses a simpler custom JWT cookie approach so the code stays easy to learn while still following the same role-checking idea. citeturn949706search0turn949706search18
