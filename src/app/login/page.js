export const metadata = {
  title: "Login | Clinica SaaS",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f7f4] px-5 py-10 text-neutral-950">
      <section className="w-full max-w-md rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">Acesso</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Entrar no Clinica SaaS</h1>
        <p className="mt-3 text-sm leading-6 text-neutral-600">
          A tela de autenticacao sera conectada ao Supabase Auth na proxima etapa.
        </p>
        <form className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-neutral-700">E-mail</span>
            <input className="mt-2 h-11 w-full rounded-lg border border-neutral-200 px-3 outline-none transition focus:border-emerald-600" type="email" placeholder="voce@clinica.com" disabled />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-neutral-700">Senha</span>
            <input className="mt-2 h-11 w-full rounded-lg border border-neutral-200 px-3 outline-none transition focus:border-emerald-600" type="password" placeholder="********" disabled />
          </label>
          <button className="h-11 w-full rounded-lg bg-neutral-950 text-sm font-semibold text-white opacity-70" type="button" disabled>
            Login sera ativado em breve
          </button>
        </form>
      </section>
    </main>
  );
}
