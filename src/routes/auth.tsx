import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Entrar — ZM9 Google Check" },
      { name: "description", content: "Acesse sua conta do ZM9 Google Check." },
      { property: "og:title", content: "Entrar — ZM9 Google Check" },
      { property: "og:description", content: "Acesse sua conta do ZM9 Google Check." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

type Mode = "signin" | "signup" | "forgot";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setMsg(null);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return setMsg({ ok: false, text: "E-mail ou senha incorretos, ou e-mail ainda não confirmado." });
        navigate({ to: "/auditoria", replace: true });
      } else if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + "/auditoria" } });
        if (error) return setMsg({ ok: false, text: error.message });
        setMsg({ ok: true, text: "Conta criada. Confirme pelo link enviado ao seu e-mail antes de entrar." });
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + "/reset-password" });
        if (error) return setMsg({ ok: false, text: error.message });
        setMsg({ ok: true, text: "Se o e-mail estiver cadastrado, você receberá um link para criar nova senha." });
      }
    } finally { setBusy(false); }
  };

  const title = mode === "signin" ? "Entrar" : mode === "signup" ? "Criar conta" : "Recuperar senha";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-2xl border bg-white p-6 shadow-card">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-white font-display font-bold text-sm">ZM9</div>
          <h1 className="font-display text-xl font-bold text-navy">{title}</h1>
        </div>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" aria-label="E-mail"
          className="w-full rounded-lg border bg-[#F8FAFC] px-3 py-2.5 text-sm text-ink focus:outline-none" />
        {mode !== "forgot" && (
          <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha (mín. 8 caracteres)" aria-label="Senha"
            className="w-full rounded-lg border bg-[#F8FAFC] px-3 py-2.5 text-sm text-ink focus:outline-none" />
        )}
        {msg && <p className={`text-sm ${msg.ok ? "text-emerald-700" : "text-red-600"}`}>{msg.text}</p>}
        <button disabled={busy} className="w-full rounded-lg bg-navy py-2.5 text-sm font-semibold text-white disabled:opacity-60">
          {busy ? "Aguarde..." : mode === "signin" ? "Entrar" : mode === "signup" ? "Criar conta" : "Enviar link"}
        </button>
        <div className="flex justify-between text-xs font-medium text-electric">
          {mode !== "signin" ? <button type="button" onClick={() => { setMode("signin"); setMsg(null); }}>Já tenho conta</button>
            : <button type="button" onClick={() => { setMode("signup"); setMsg(null); }}>Criar conta</button>}
          {mode !== "forgot" && <button type="button" onClick={() => { setMode("forgot"); setMsg(null); }}>Esqueci minha senha</button>}
        </div>
      </form>
    </div>
  );
}
