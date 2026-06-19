import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendarDays, CreditCard, LayoutDashboard, LogOut, ReceiptText, Scissors, Sparkles, Stethoscope, UsersRound } from "lucide-react";
import { requireClinic } from "@/lib/auth/session";
import { signOutAction } from "@/app/login/actions";
import { getClinicBillingState } from "@/lib/saas/plans";

const navItems = [
  { href: "/dashboard", label: "Visao geral", icon: LayoutDashboard },
  { href: "/dashboard/agenda", label: "Agenda", icon: CalendarDays },
  { href: "/dashboard/clientes", label: "Clientes", icon: UsersRound },
  { href: "/dashboard/profissionais", label: "Profissionais", icon: Stethoscope },
  { href: "/dashboard/procedimentos", label: "Procedimentos", icon: Scissors },
  { href: "/dashboard/financeiro", label: "Financeiro", icon: CreditCard },
  { href: "/dashboard/assinatura", label: "Assinatura", icon: ReceiptText },
];

function safeColor(value, fallback) {
  const color = String(value || "").trim();
  return /^#[0-9a-f]{6}$/i.test(color) ? color : fallback;
}

export default async function DashboardLayout({ children }) {
  const { user, activeClinic } = await requireClinic();

  if (!activeClinic) {
    redirect("/onboarding");
  }

  const metadata = activeClinic.metadata || {};
  const primaryColor = safeColor(metadata.primary_color, "#047857");
  const accentColor = safeColor(metadata.accent_color, "#10b981");
  const logoUrl = metadata.logo_url || "";
  const billingState = getClinicBillingState(activeClinic);

  return (
    <div className="min-h-screen bg-[#f7f7f4] text-neutral-950 lg:grid lg:grid-cols-[260px_1fr]" style={{ "--clinic-primary": primaryColor, "--clinic-accent": accentColor }}>
      <aside className="border-b border-neutral-200 bg-white px-5 py-4 lg:min-h-screen lg:border-b-0 lg:border-r lg:px-4">
        <div className="flex items-center justify-between gap-3 lg:block">
          <div>
            <div className="flex items-center gap-2" style={{ color: "var(--clinic-primary)" }}>
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt={`Logo ${activeClinic.nome}`} className="h-7 w-7 rounded-md object-cover" />
              ) : <Sparkles size={18} />}
              <span className="text-xs font-bold uppercase tracking-[0.2em]">{metadata.brand_name || "Clinica SaaS"}</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-neutral-950">{activeClinic.nome}</p>
            <p className="mt-1 truncate text-xs text-neutral-500" title={user?.email}>{user?.email}</p>
          </div>
          <form action={signOutAction} className="lg:hidden">
            <input type="hidden" name="next" value="/login-cliente" />
            <button className="rounded-lg border border-neutral-200 p-2 text-neutral-600" type="submit" title="Sair">
              <LogOut size={18} />
            </button>
          </form>
        </div>

        <nav className="mt-5 flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950">
                <Icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <form action={signOutAction} className="mt-6 hidden lg:block">
          <input type="hidden" name="next" value="/login-cliente" />
          <button className="inline-flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-neutral-500 transition hover:bg-red-50 hover:text-red-700" type="submit">
            <LogOut size={17} />
            Sair
          </button>
        </form>
      </aside>
      <section className="min-w-0">
        {billingState.level !== "ok" ? (
          <div className={`border-b px-5 py-3 text-sm sm:px-8 lg:px-10 ${billingState.level === "danger" ? "border-red-200 bg-red-50 text-red-800" : billingState.level === "warning" ? "border-amber-200 bg-amber-50 text-amber-900" : "border-sky-200 bg-sky-50 text-sky-900"}`}>
            <strong>{billingState.title}.</strong> {billingState.message}
          </div>
        ) : null}
        <div className="h-1" style={{ background: "linear-gradient(90deg, var(--clinic-primary), var(--clinic-accent))" }} />
        {children}
      </section>
    </div>
  );
}
