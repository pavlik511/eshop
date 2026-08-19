import { loginAction } from '../actions';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const hasError = params.error === 'invalid_password';

  return (
    <main className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-neutral-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black uppercase italic text-brand-dark tracking-tight">
            Admin <span className="text-brand-primary">Pizzerie</span>
          </h1>
          <p className="text-neutral-500 text-sm mt-1">Zadej tajné heslo pro vstup do správy</p>
        </div>

        <form action={loginAction} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-neutral-700 mb-2 uppercase italic">
              Heslo
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-neutral-900"
            />
          </div>

          {hasError && (
            <p className="text-red-500 text-sm font-semibold text-center">
              ❌ Nesprávné heslo! Zkus to znovu.
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-brand-primary hover:bg-yellow-400 text-brand-dark font-black py-4 rounded-xl uppercase italic tracking-wider transition-colors shadow-md"
          >
            Vstoupit do administrace
          </button>
        </form>
      </div>
    </main>
  );
}