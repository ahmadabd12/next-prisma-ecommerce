export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md rounded-xl border bg-white p-6">
      <h1 className="mb-6 text-2xl font-bold">Create Account</h1>
      <form action="/api/auth/register" method="post" className="grid gap-3">
        <input name="name" placeholder="Full name" className="rounded border px-3 py-2" required />
        <input name="email" type="email" placeholder="Email" className="rounded border px-3 py-2" required />
        <input name="password" type="password" placeholder="Password" className="rounded border px-3 py-2" required />
        <button className="rounded bg-black px-4 py-2 text-white">Register</button>
      </form>
    </div>
  );
}
