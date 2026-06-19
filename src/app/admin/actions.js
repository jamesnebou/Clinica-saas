"use server";

import { revalidatePath } from "next/cache";
import { requireInternalAdmin } from "@/lib/auth/session";
import { supabaseAdmin } from "@/lib/supabase/admin";

function text(formData, key) {
  return String(formData.get(key) || "").trim();
}

function nullableText(formData, key) {
  const value = text(formData, key);
  return value || null;
}

function numberValue(formData, key, fallback = 0) {
  const value = Number(String(formData.get(key) || "").replace(",", "."));
  return Number.isFinite(value) ? value : fallback;
}

function intValue(formData, key, fallback = 0) {
  return Math.max(1, Math.round(numberValue(formData, key, fallback)));
}

function requireValue(value, message) {
  if (!value) throw new Error(message);
  return value;
}

export async function updateClinicCommercialAction(formData) {
  await requireInternalAdmin();
  const id = requireValue(text(formData, "clinica_id"), "Clinica nao informada.");
  const status = requireValue(text(formData, "status"), "Status nao informado.");
  const plano = requireValue(text(formData, "plano"), "Plano nao informado.");
  const trialEndsAt = nullableText(formData, "trial_ends_at");
  const proximaCobranca = nullableText(formData, "proxima_cobranca_em");
  const bloqueioMotivo = nullableText(formData, "bloqueio_motivo");

  const assinaturaStatus = status === "trial"
    ? "trial"
    : status === "ativa"
      ? "ativa"
      : status === "inadimplente"
        ? "atrasada"
        : status === "cancelada"
          ? "cancelada"
          : "ativa";

  const { error } = await supabaseAdmin
    .from("clinicas")
    .update({
      status,
      plano,
      assinatura_status: assinaturaStatus,
      trial_ends_at: trialEndsAt ? new Date(`${trialEndsAt}T23:59:59`).toISOString() : null,
      billing_email: nullableText(formData, "billing_email"),
      proxima_cobranca_em: proximaCobranca,
      asaas_customer_id: nullableText(formData, "asaas_customer_id"),
      asaas_subscription_id: nullableText(formData, "asaas_subscription_id"),
      bloqueio_motivo: bloqueioMotivo,
      bloqueada_em: status === "inadimplente" || status === "cancelada" ? new Date().toISOString() : null,
    })
    .eq("id", id);

  if (error) throw error;
  revalidatePath("/admin");
  revalidatePath("/dashboard");
}

export async function upsertSystemPlanAction(formData) {
  await requireInternalAdmin();
  const slug = requireValue(text(formData, "slug"), "Informe o slug do plano.");

  const payload = {
    slug,
    nome: requireValue(text(formData, "nome"), "Informe o nome do plano."),
    descricao: nullableText(formData, "descricao"),
    preco_mensal: numberValue(formData, "preco_mensal", 0),
    limite_usuarios: intValue(formData, "limite_usuarios", 1),
    limite_profissionais: intValue(formData, "limite_profissionais", 1),
    limite_clientes: intValue(formData, "limite_clientes", 100),
    limite_agendamentos_mes: intValue(formData, "limite_agendamentos_mes", 100),
    ativo: formData.get("ativo") === "on",
    ordem: Math.max(0, Math.round(numberValue(formData, "ordem", 0))),
  };

  const { error } = await supabaseAdmin.from("planos_sistema").upsert(payload, { onConflict: "slug" });
  if (error) throw error;
  revalidatePath("/admin");
}
