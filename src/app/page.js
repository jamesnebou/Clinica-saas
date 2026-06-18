import {
  CalendarDays,
  ChartNoAxesCombined,
  ClipboardList,
  CreditCard,
  Sparkles,
  UsersRound,
} from "lucide-react";

const metrics = [
  { label: "Agendamentos hoje", value: "0", icon: CalendarDays },
  { label: "Clientes cadastrados", value: "0", icon: UsersRound },
  { label: "Receita prevista", value: "R$ 0", icon: CreditCard },
];

const modules = [
  "Agenda inteligente",
  "Clientes e prontuarios",
  "Procedimentos e pacotes",
  "Profissionais e comissoes",
  "Financeiro da clinica",
  "Relatorios gerenciais",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f7f4] text-neutral-950">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-neutral-200 pb-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">
              Clinica SaaS
            </p>
            <h1 className="mt-1 text-xl font-semibold tracking-tight text-neutral-950">
              Gestao para clinicas de estetica
            </h1>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm sm:flex">
            <Sparkles size={16} className="text-emerald-600" />
            Base inicial pronta
          </div>
        </header>

        <div className="grid flex-1 gap-8 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
              MVP em construcao
            </div>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl">
              Uma operacao mais clara para vender, agendar e cuidar de clientes.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-neutral-650 sm:text-lg">
              Esta e a base do novo SaaS: Next.js, Tailwind, Supabase e deploy pela Vercel. A partir daqui entram autenticacao, dashboard, agenda, clientes, financeiro e relatorios.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/dashboard"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-neutral-950 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800"
              >
                Abrir dashboard
              </a>
              <a
                href="/login"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-neutral-250 bg-white px-5 text-sm font-semibold text-neutral-800 shadow-sm transition hover:bg-neutral-50"
              >
                Login
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {metrics.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-lg border border-neutral-200 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-neutral-500">{item.label}</span>
                      <Icon size={18} className="text-emerald-600" />
                    </div>
                    <strong className="mt-4 block text-2xl font-semibold text-neutral-950">
                      {item.value}
                    </strong>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 rounded-lg border border-neutral-200 p-5">
              <div className="flex items-center gap-2">
                <ClipboardList size={18} className="text-emerald-600" />
                <h3 className="text-base font-semibold text-neutral-950">Modulos principais</h3>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {modules.map((module) => (
                  <div key={module} className="rounded-md bg-neutral-50 px-3 py-2 text-sm font-medium text-neutral-700">
                    {module}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-lg bg-neutral-950 p-5 text-white">
              <ChartNoAxesCombined size={22} className="text-emerald-400" />
              <p className="text-sm leading-6 text-neutral-200">
                Proxima etapa: schema Supabase, auth e dashboard operacional para clinicas.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
