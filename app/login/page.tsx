export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md space-y-6">
      <div>
        <h1 className="mb-2 text-3xl font-bold text-slate-900">Login</h1>
        <p className="text-sm text-gray-600">Access your account to manage orders and shopping.</p>
      </div>
      <div className="surface p-6">
      <form action="/api/auth/login" method="post" className="grid gap-3">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="rounded border px-3 py-2"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="rounded border px-3 py-2"
            required
          />
          <button className="btn-primary">Login</button>
      </form>
      <div className="mt-4 text-sm text-gray-600">
        <p>Admin: admin@example.com / Admin@123</p>
        <p>Customer: customer@example.com / Customer@123</p>
      </div>
      </div>
    </div>
  );
}
