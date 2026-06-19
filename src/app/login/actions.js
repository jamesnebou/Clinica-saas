"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isInternalAdminEmail } from "@/lib/saas/plans";

function safeNext(value, fallback) {
  const next = String(value || "").trim();
  if (!next || !next.startsWith("/") || next.startsWith("//")) return fallback;
  return next;
}

export async function signInAction(_prevState, formData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const mode = String(formData.get("mode") || "cliente");
  const next = safeNext(formData.get("next"), mode === "admin" ? "/admin" : "/dashboard");

  if (!email || !password) {
    return { ok: false, message: "Informe e-mail e senha." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { ok: false, message: "E-mail ou senha invalidos." };
  }

  if (mode === "admin" && !isInternalAdminEmail(email)) {
    await supabase.auth.signOut();
    return { ok: false, message: "Este e-mail nao esta autorizado no painel administrativo interno." };
  }

  redirect(next);
}

export async function signOutAction(formData) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(safeNext(formData?.get?.("next"), "/login-cliente"));
}
