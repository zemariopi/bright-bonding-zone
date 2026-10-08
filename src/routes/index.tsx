import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Globe, FileText, Smartphone, ShieldCheck, Gauge, Tags, Code2, Link2, Copy, CheckCircle2, AlertTriangle, XCircle, ArrowRight, Zap, Eye } from "lucide-react";

export const Route = createFileRoute("/")({
 component: Index,
});

type Diagnostic = {
 id: number;
 title: string;
 description: string;
 icon: React.ReactNode;
 status: "success" | "warning" | "error";
 detail: string;
};

const diagnostics: Diagnostic[] = [
 {
 id: 1,
 title: "Indexação no Google",
 description: "Verifica se o site está indexado e quantas páginas foram encontradas.",
 icon: <Search className="h-5 w-5" />,
 status: "success",
 detail: "128 páginas indexadas",
 },
 {
 id: 2,
 title: "Sitemap.xml",
 description: "Valida existência, formato e acessibilidade do sitemap.",
 icon: <Globe className="h-5 w-5" />,
 status: "success",
 detail: "Encontrado e válido",
 },
 {
 id: 3,
 title: "Robots.txt",
 description: "Analisa regras de rastreamento e bloqueios indevidos.",
 icon: <FileText className="h-5 w-5" />,
 status: "warning",
 detail: "Permitindo rastreamento parcial",
 },
 {
 id: 4,
 title: "Core Web Vitals",
 description: "Performance, LCP, CLS e interatividade (INP).",
 icon: <Gauge className="h-5 w-5" />,
 status: "warning",
 detail: "LCP 2.8s - precisa melhorar",
 },
 {
 id: 5,
 title: "Mobile Friendly",
 description: "Compatibilidade e usabilidade em dispositivos móveis.",
 icon: <Smartphone className="h-5 w-5" />,
 status: "success",
 detail: "100% responsivo",
 },
 {
 id: 6,
 title: "HTTPS / SSL",
 description: "Certificado, redirecionamento e segurança.",
 icon: <ShieldCheck className="h-5 w-5" />,
 status: "success",
 detail: "Certificado válido",
 },
 {
 id: 7,
 title: "Metatags SEO",
 description: "Title, description, canonical e Open Graph.",
 icon: <Tags className="h-5 w-5" />,
 status: "error",
 detail: "12 titles duplicados",
 },
 {
 id: 8,
 title: "Dados Estruturados",
 description: "Schema.org e rich results elegíveis.",
 icon: <Code2 className="h-5 w-5" />,
 status: "warning",
 detail: "Schema incompleto",
 },
 {
 id: 9,
 title: "Links Quebrados",
 description: "Erros 404 internos e externos detectados.",
 icon: <Link2 className="h-5 w-5" />,
 status: "error",
 detail: "7 links quebrados",
 },
 {
 id: 10,
 title: "Conteúdo Duplicado",
 description: "Páginas com conteúdo idêntico ou muito similar.",
 icon: <Copy className="h-5 w-5" />,
 status: "success",
 detail: "Nenhuma duplicidade",
 },
];

function statusConfig(status: Diagnostic["status"]) {
 if (status === "success") return { label: "OK", color: "text-emerald-600 bg-emerald-50 border-emerald-200", icon: <CheckCircle2 className="h-4 w-4 text-emerald-600" /> };
 if (status === "warning") return { label: "Atenção", color: "text-amber-600 bg-amber-50 border-amber-200", icon: <AlertTriangle className="h-4 w-4 text-amber-600" /> };
 return { label: "Erro", color: "text-red-600 bg-red-50 border-red-200", icon: <XCircle className="h-4 w-4 text-red-600" /> };
}

function Index() {
 const [url, setUrl] = useState("");
 const [analyzed, setAnalyzed] = useState(true);

 const handleAnalyze = () => {
 if (!url.trim()) return;
 setAnalyzed(true);
 };

 return (
 <div className="min-h-screen bg-[#F8FAFC]">
 <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/80">
 <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
 <div className="flex items-center gap-3">
 <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-white font-display font-bold text-sm">ZM9</div>
 <div>
 <div className="font-display text-[15px] font-bold leading-none text-navy">ZM9 Google Check</div>
 <div className="text-xs font-medium tracking-widest text-electric">V1 • DIAGNÓSTICO</div>
 </div>
 </div>
 <div className="hidden items-center gap-2 text-xs font-medium text-muted-foreground sm:flex">
 <span className="h-2 w-2 rounded-full bg-emerald-500" />
 Sistema operacional
 </div>
 </div>
 </header>

 <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
 <div className="animate-in rounded-2xl bg-navy p-6 text-white shadow-premium sm:p-8">
 <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
 <div className="max-w-2xl">
 <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide">
 <Zap className="h-3.5 w-3.5 text-white" />
 ANÁLISE COMPLETA EM SEGUNDOS
 </div>
 <h1 className="font-display mt-4 text-3xl font-bold leading-tight sm:text-4xl">
 Diagnóstico completo da sua <span className="text-electric">presença no Google</span>
 </h1>
 <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-[15px]">
 Insira a URL do seu site e receba 10 diagnósticos essenciais de SEO técnico, indexação e visibilidade. Relatório premium pronto para compartilhar.
 </p>
 </div>
 <div className="hidden lg:block">
 <div className="rounded-xl bg-white p-4 text-navy shadow-card">
 <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground"><Eye className="h-4 w-4" /> Visão geral</div>
 <div className="mt-3 grid grid-cols-3 gap-3 text-center">
 <div><div className="text-2xl font-bold text-emerald-600">5</div><div className="text-[11px] font-medium text-muted-foreground">OK</div></div>
 <div><div className="text-2xl font-bold text-amber-600">3</div><div className="text-[11px] font-medium text-muted-foreground">Atenção</div></div>
 <div><div className="text-2xl font-bold text-red-600">2</div><div className="text-[11px] font-medium text-muted-foreground">Erros</div></div>
 </div>
 <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100"><div className="h-full w-[70%] rounded-full bg-electric" /></div>
 <div className="mt-1 text-center text-xs font-medium text-muted-foreground">Score 70/100</div>
 </div>
 </div>
 </div>

 <div className="mt-8 flex flex-col gap-3 rounded-xl bg-white p-3 shadow-card sm:flex-row sm:items-center">
 <div className="flex flex-1 items-center gap-3 rounded-lg border bg-[#F8FAFC] px-3 py-2.5">
 <Globe className="h-5 w-5 shrink-0 text-muted-foreground" />
 <input
 value={url}
 onChange={(e) => setUrl(e.target.value)}
 placeholder="Digite a URL do site (ex: https://seusite.com.br)"
 className="w-full bg-transparent text-sm font-medium text-ink placeholder:text-muted-foreground focus:outline-none"
 />
 </div>
 <button
 onClick={handleAnalyze}
 className="inline-flex items-center justify-center gap-2 rounded-lg bg-electric px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-electric-600"
 >
 Analisar agora <ArrowRight className="h-4 w-4" />
 </button>
 </div>
 <p className="mt-3 text-center text-xs text-white/60 sm:text-left">Exemplo: https://zm9.com.br — análise não invasiva, sem necessidade de login.</p>
 </div>

 {analyzed && (
 <div className="mt-8 animate-in">
 <div className="flex flex-wrap items-center justify-between gap-4">
 <h2 className="font-display text-xl font-bold text-navy">10 Diagnósticos Essenciais</h2>
 <div className="flex items-center gap-2 text-xs">
 <span className="inline-flex items-center gap-1.5 rounded-full border bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-700 border-emerald-200"><CheckCircle2 className="h-3.5 w-3.5" /> 5 OK</span>
 <span className="inline-flex items-center gap-1.5 rounded-full border bg-amber-50 px-2.5 py-1 font-semibold text-amber-700 border-amber-200"><AlertTriangle className="h-3.5 w-3.5" /> 3 Atenção</span>
 <span className="inline-flex items-center gap-1.5 rounded-full border bg-red-50 px-2.5 py-1 font-semibold text-red-700 border-red-200"><XCircle className="h-3.5 w-3.5" /> 2 Erros</span>
 </div>
 </div>

 <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
 {diagnostics.map((d) => {
 const cfg = statusConfig(d.status);
 return (
 <div key={d.id} className="print-break group rounded-xl border bg-white p-5 shadow-card transition hover:shadow-premium">
 <div className="flex items-start justify-between gap-3">
 <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy text-white">{d.icon}</div>
 <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${cfg.color}`}>
 {cfg.icon} {cfg.label}
 </span>
 </div>
 <div className="mt-4">
 <div className="flex items-center gap-2">
 <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-navy">{d.id}</span>
 <h3 className="font-display text-sm font-bold text-navy">{d.title}</h3>
 </div>
 <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.description}</p>
 <div className="mt-3 rounded-lg bg-[#F8FAFC] px-3 py-2 text-xs font-semibold text-ink border">{d.detail}</div>
 </div>
 </div>
 );
 })}
 </div>

 <div className="mt-8 grid gap-4 lg:grid-cols-3">
 <div className="rounded-xl bg-white p-6 shadow-card border lg:col-span-2">
 <h3 className="font-display font-bold text-navy">Resumo executivo</h3>
 <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
 Seu site apresenta boa indexação e segurança, mas possui pontos críticos em metatags duplicadas e links quebrados que impactam rastreamento e experiência. Corrija os 2 erros prioritários para ganhar até +20 pontos no score.
 </p>
 <div className="mt-4 flex flex-wrap gap-2">
 <span className="rounded-full bg-electric px-3 py-1 text-xs font-bold text-white">Prioridade 1: Corrigir titles</span>
 <span className="rounded-full bg-navy px-3 py-1 text-xs font-bold text-white">Prioridade 2: Links 404</span>
 </div>
 </div>
 <div className="rounded-xl bg-navy p-6 text-white shadow-premium">
 <h3 className="font-display font-bold">Score geral</h3>
 <div className="mt-3 flex items-baseline gap-2">
 <span className="text-4xl font-display font-bold">70</span><span className="text-lg font-medium text-white/70">/100</span>
 </div>
 <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/20"><div className="h-full w-[70%] rounded-full bg-electric" /></div>
 <p className="mt-3 text-xs leading-relaxed text-white/70">Classificação: Bom — com ajustes pontuais alcança Excelente.</p>
 <button onClick={() => window.print()} className="no-print mt-4 w-full rounded-lg bg-white px-4 py-2 text-sm font-bold text-navy transition hover:bg-slate-100">Imprimir relatório</button>
 </div>
 </div>
 </div>
 )}

 <footer className="mt-12 border-t pt-6 text-center text-xs text-muted-foreground">
 <p className="font-medium">© {new Date().getFullYear()} ZM9 • Google Check v1 — Diagnóstico técnico sem recriar o sistema.</p>
 <p className="mt-1">Preservando identidade visual, funcionalidades e os 10 diagnósticos originais.</p>
 </footer>
 </main>
 </div>
 );
}
