import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZM9 Google Check — Auditoria do Perfil da Empresa no Google" },
      { name: "description", content: "Diagnóstico do Perfil da Empresa no Google: categorias, serviços, endereço, horários, contato, fotos e avaliações." },
      { property: "og:title", content: "ZM9 Google Check — Auditoria do Perfil da Empresa no Google" },
      { property: "og:description", content: "Diagnóstico do Perfil da Empresa no Google com dados reais e verificáveis." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-white font-display font-bold text-sm">ZM9</div>
            <div>
              <div className="font-display text-[15px] font-bold leading-none text-navy">ZM9 Google Check</div>
              <div className="text-xs font-medium tracking-widest text-electric">PERFIL DA EMPRESA NO GOOGLE</div>
            </div>
          </div>
          <Link to="/auth" className="rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white">Entrar</Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="rounded-2xl bg-navy p-8 text-white shadow-premium">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide">
            <ShieldCheck className="h-3.5 w-3.5" /> ACESSO RESTRITO
          </div>
          <h1 className="font-display mt-4 text-3xl font-bold sm:text-4xl">
            Diagnóstico do seu <span className="text-electric">Perfil da Empresa no Google</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-[15px]">
            A auditoria cobre 10 pontos do perfil, com dados reais e verificáveis. Entre na sua conta para auditar.
          </p>
          <Link to="/auditoria" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-electric px-5 py-3 text-sm font-semibold text-white">
            Acessar auditoria <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
