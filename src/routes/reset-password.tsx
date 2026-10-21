import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Nova senha — ZM9 Google Check" },
      { name: "description", content: "Defina uma nova senha para sua conta." },
      { property: "og:title", content: "Nova senha — ZM9 Google Check" },
      { property: "og:description", content: "Defina uma nova senha para sua conta." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (window.location.hash.includes("type=recovery")) setReady(true);
    const { data } = supabase.auth.onAuthStateChange((event) => { if (event === "PASSWORD_RECOVERY") setReady(true); });
    return () => data.subscription.unsubscribe();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) return setMsg(error.message);
    navigate({ to: "/auditoria", replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-2xl border bg-white p-6 shadow-card">
        <h1 className="font-display text-xl font-bold text-navy">Criar nova senha</h1>
        {!ready ? <p className="text-sm text-muted-foreground">Abra esta página pelo link enviado ao seu e-mail.</p> : (
          <>
            <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Nova senha" aria-label="Nova senha"
              className="w-full rounded-lg border bg-[#F8FAFC] px-3 py-2.5 text-sm text-ink focus:outline-none" />
            {msg && <p className="text-sm text-red-600">{msg}</p>}
            <button className="w-full rounded-lg bg-navy py-2.5 text-sm font-semibold text-white">Salvar senha</button>
          </>
        )}
      </form>
    </div>
  );
}
