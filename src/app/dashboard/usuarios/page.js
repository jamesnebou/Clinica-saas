import { ShieldCheck, UserPlus, UsersRound } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { requireClinic } from "@/lib/auth/session";
import { EmptyClinicState, EmptyState, Field, PageHeader, SubmitButton } from "@/components/app-shell/ui";
import { getClinicPlan, getClinicUsage } from "@/lib/saas/plans";
import { inviteClinicUserAction, updateClinicUserAction } from "../actions";

export const metadata = { title: "Usuarios | Clinica SaaS" };

const roles = [
  ["owner", "Owner"],
  ["admin", "Admin"],
  ["recepcao", "Recepcao"],
  ["financeiro", "Financeiro"],
  ["profissional", "Profissional"],
];

function SelectField({ label, name, defaultValue = "", children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-neutral-700">{label}</span>
      <select name={name} defaultValue={defaultValue} className="mt-2 h-11 w-full rounded-lg border border-neutral-200 bg-white px-3 text-sm outline-none transition focus:border-[var(--clinic-primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--clinic-primary)_18%,transparent)]">
        {children}
      </select>
    </label>
  );
}

function Notice({ type = "info", children }) {
  const styles = type === "success" ? "border-[color-mix(in_srgb,var(--clinic-primary)_24%,#e5e5e5)] bg-[color-mix(in_srgb,var(--clinic-accent)_10%,white)] text-[var(--clinic-primary)]" : "border-amber-200 bg-amber-50 text-amber-900";
  return <div className={`mt-6 rounded-lg border px-4 py-3 text-sm ${styles}`}>{children}</div>;
}

export default async function UsuariosPage({ searchParams }) {
  const params = await searchParams;
  const { activeClinic } = await requireClinic();

  if (!activeClinic) {
    return <main className="px-5 py-8 sm:px-8 lg:px-10"><EmptyClinicState /></main>;
  }

  const supabase = await createClient();
  const [{ data: usuarios = [] }, plan, usage] = await Promise.all([
    supabase
      .from("usuarios_clinica")
      .select("id, nome, email, papel, ativo, invited_at, accepted_at, created_at")
      .eq("clinica_id", activeClinic.id)
      .order("created_at", { ascending: true }),
    getClinicPlan(activeClinic),
    getClinicUsage(activeClinic.id),
  ]);

  const remaining = Math.max(0, Number(plan.limite_usuarios || 0) - Number(usage.usuarios || 0));

  return (
    <main className="px-5 py-8 sm:px-8 lg:px-10">
      <section className="mx-auto max-w-7xl">
        <PageHeader eyebrow="Acesso" title="Usuarios da clinica" description="Convide pessoas da equipe, defina papeis e controle usuarios ativos dentro do limite do plano." />

        {params?.ok === "convite" ? <Notice type="success">Usuario convidado ou reativado com sucesso.</Notice> : null}
        {params?.ok === "usuario" ? <Notice type="success">Usuario atualizado com sucesso.</Notice> : null}
        {params?.erro ? <Notice>{params?.mensagem || "Nao foi possivel concluir esta acao."}</Notice> : null}

        <div className="mt-8 grid gap-6 lg:grid-cols-[420px_1fr]">
          <form action={inviteClinicUserAction} className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2"><UserPlus size={20} className="text-[var(--clinic-primary)]" /><h2 className="text-lg font-semibold">Convidar usuario</h2></div>
            <p className="mt-2 text-sm leading-6 text-neutral-600">Usuarios ativos: {usage.usuarios}/{plan.limite_usuarios}. Restam {remaining} no plano {plan.nome}.</p>
            <div className="mt-4 space-y-4">
              <Field label="Nome" name="nome" />
              <Field label="E-mail" name="email" type="email" required />
              <SelectField label="Papel" name="papel" defaultValue="recepcao">
                {roles.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </SelectField>
              <SubmitButton>Convidar usuario</SubmitButton>
            </div>
          </form>

          <section className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2"><UsersRound size={20} className="text-[var(--clinic-primary)]" /><h2 className="text-lg font-semibold">Equipe com acesso</h2></div>
            <div className="mt-4 space-y-3">
              {usuarios.length === 0 ? (
                <EmptyState title="Nenhum usuario cadastrado" description="Convide os usuarios que vao operar agenda, financeiro e cadastros da clinica." />
              ) : usuarios.map((usuario) => (
                <form key={usuario.id} action={updateClinicUserAction} className="rounded-lg border border-neutral-200 p-4">
                  <input type="hidden" name="id" value={usuario.id} />
                  <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr_160px_130px] xl:items-end">
                    <Field label="Nome" name="nome" defaultValue={usuario.nome || ""} />
                    <div>
                      <p className="text-sm font-medium text-neutral-700">E-mail</p>
                      <p className="mt-2 h-11 rounded-lg border border-neutral-100 bg-neutral-50 px-3 py-3 text-sm text-neutral-600">{usuario.email}</p>
                    </div>
                    <SelectField label="Papel" name="papel" defaultValue={usuario.papel}>
                      {roles.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                    </SelectField>
                    <SelectField label="Status" name="ativo" defaultValue={usuario.ativo ? "true" : "false"}>
                      <option value="true">Ativo</option>
                      <option value="false">Desativado</option>
                    </SelectField>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <p className="inline-flex items-center gap-2 text-xs text-neutral-500"><ShieldCheck size={14} /> {usuario.accepted_at ? "Acesso aceito" : "Convite pendente ou login por e-mail"}</p>
                    <SubmitButton>Salvar usuario</SubmitButton>
                  </div>
                </form>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

