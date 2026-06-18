import { CalendarDays, CreditCard, UsersRound } from "lucide-react";

const cards = [
  { title: "Agenda", description: "Agendamentos, encaixes e historico de atendimento.", icon: CalendarDays },
  { title: "Clientes", description: "Cadastro, jornada, preferencias e retorno.", icon: UsersRound },
  { title: "Financeiro", description: "Recebimentos, pacotes, assinaturas e indicadores.", icon: CreditCard },
];

export const metadata = {
  title: "Dashboard | Clinica SaaS",
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f4] px-5 py-8 text-neutral-950 sm:px-8 lg:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="border-b border-neutral-200 pb-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">Dashboard</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Operacao da clinica</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600">
            Base inicial do painel. Os proximos passos sao autenticacao, banco Supabase, agenda, clientes e financeiro.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <article key={card.title} className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
                <Icon size={22} className="text-emerald-600" />
                <h2 className="mt-4 text-lg font-semibold">{card.title}</h2>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{card.description}</p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
