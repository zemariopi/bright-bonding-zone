import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Tags, Briefcase, MapPin, Clock, Phone, ListChecks, Image, Star, ClipboardCheck, Navigation, CheckCircle2, AlertTriangle, XCircle, HelpCircle, ArrowRight, Zap, Building2, Search, Flag } from "lucide-react";
import { runAudit, type CheckStatus, type ProfileData } from "@/lib/gbp-checks";
import { searchPlaces, getPlaceProfile } from "@/lib/places.functions";
import { PLACES_SOURCE, type PlaceCandidate } from "@/lib/places-map";

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
  component: Index,
});

type Meta = { icon: React.ReactNode; description: string; priority: "Alta" | "Média"; recommendation: string };

const META: Record<number, Meta> = {
  1: { icon: <Tags className="h-5 w-5" />, description: "Categoria principal e categorias adicionais.", priority: "Alta", recommendation: "Escolher a categoria principal que descreve o negócio de forma mais específica." },
  2: { icon: <Briefcase className="h-5 w-5" />, description: "Serviços cadastrados no perfil.", priority: "Média", recommendation: "Listar os serviços realmente oferecidos." },
  3: { icon: <MapPin className="h-5 w-5" />, description: "Endereço, localização no mapa e área de atendimento.", priority: "Alta", recommendation: "Manter endereço ou área de atendimento corretos e consistentes." },
  4: { icon: <Clock className="h-5 w-5" />, description: "Horários regulares e especiais.", priority: "Alta", recommendation: "Manter horários atualizados, incluindo feriados." },
  5: { icon: <Phone className="h-5 w-5" />, description: "Telefone, site e informações de contato.", priority: "Alta", recommendation: "Informar telefone e site válidos." },
  6: { icon: <ListChecks className="h-5 w-5" />, description: "Atributos do estabelecimento.", priority: "Média", recommendation: "Marcar os atributos aplicáveis ao negócio." },
  7: { icon: <Image className="h-5 w-5" />, description: "Quantidade e qualidade das fotos.", priority: "Média", recommendation: "Publicar fotos reais e recentes do local, equipe e produtos." },
  8: { icon: <Star className="h-5 w-5" />, description: "Avaliações e respostas do proprietário.", priority: "Alta", recommendation: "Responder às avaliações de forma cordial e sem pedir avaliações em troca de benefícios." },
  9: { icon: <ClipboardCheck className="h-5 w-5" />, description: "Completude e consistência das informações.", priority: "Média", recommendation: "Preencher todos os campos aplicáveis com informações consistentes." },
  10: { icon: <Navigation className="h-5 w-5" />, description: "Presença em buscas locais, quando verificável.", priority: "Média", recommendation: "Usar como referência pontual; resultados variam por local e horário." },
};

function statusConfig(status: CheckStatus) {
  if (status === "success") return { label: "OK", color: "text-emerald-600 bg-emerald-50 border-emerald-200", icon: <CheckCircle2 className="h-4 w-4" /> };
  if (status === "warning") return { label: "Atenção", color: "text-amber-600 bg-amber-50 border-amber-200", icon: <AlertTriangle className="h-4 w-4" /> };
  if (status === "error") return { label: "Erro", color: "text-red-600 bg-red-50 border-red-200", icon: <XCircle className="h-4 w-4" /> };
  return { label: "Não verificado", color: "text-slate-600 bg-slate-50 border-slate-200", icon: <HelpCircle className="h-4 w-4" /> };
}

const WAITING = "Aguardando conexão com dados reais do Google";

// 27 unidades federativas do Brasil (26 estados + Distrito Federal).
const BRAZIL_UFS = [
  { sigla: "AC", nome: "Acre" }, { sigla: "AL", nome: "Alagoas" }, { sigla: "AP", nome: "Amapá" },
  { sigla: "AM", nome: "Amazonas" }, { sigla: "BA", nome: "Bahia" }, { sigla: "CE", nome: "Ceará" },
  { sigla: "DF", nome: "Distrito Federal" }, { sigla: "ES", nome: "Espírito Santo" }, { sigla: "GO", nome: "Goiás" },
  { sigla: "MA", nome: "Maranhão" }, { sigla: "MT", nome: "Mato Grosso" }, { sigla: "MS", nome: "Mato Grosso do Sul" },
  { sigla: "MG", nome: "Minas Gerais" }, { sigla: "PA", nome: "Pará" }, { sigla: "PB", nome: "Paraíba" },
  { sigla: "PR", nome: "Paraná" }, { sigla: "PE", nome: "Pernambuco" }, { sigla: "PI", nome: "Piauí" },
  { sigla: "RJ", nome: "Rio de Janeiro" }, { sigla: "RN", nome: "Rio Grande do Norte" }, { sigla: "RS", nome: "Rio Grande do Sul" },
  { sigla: "RO", nome: "Rondônia" }, { sigla: "RR", nome: "Roraima" }, { sigla: "SC", nome: "Santa Catarina" },
  { sigla: "SP", nome: "São Paulo" }, { sigla: "SE", nome: "Sergipe" }, { sigla: "TO", nome: "Tocantins" },
] as const;

function Index() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");
  const [submitted, setSubmitted] = useState<{ name: string; city: string; uf: string } | null>(null);
  const [candidates, setCandidates] = useState<PlaceCandidate[] | null>(null);
  const [profile, setProfile] = useState<ProfileData>({});
  const [source, setSource] = useState<{ name: string | null; mapsUri: string | null; fetchedAt: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const search = useServerFn(searchPlaces);
  const details = useServerFn(getPlaceProfile);

  // Without real data every check receives empty data -> "Não verificado".
  const results = runAudit(profile);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !city.trim() || !uf) return;
    setSubmitted({ name: name.trim(), city: city.trim(), uf });
    setCandidates(null); setProfile({}); setSource(null); setErrorMsg(null); setLoading(true);
    try {
      const r = await search({ data: { name: name.trim(), city: city.trim(), uf } });
      if (r.status === "ok") setCandidates(r.candidates);
      else if (r.status === "error") setErrorMsg(r.message);
    } catch { setErrorMsg("Não foi possível conectar ao Google. Nenhum resultado foi gerado."); }
    finally { setLoading(false); }
  };

  const pick = async (id: string) => {
    setLoading(true); setErrorMsg(null);
    try {
      const r = await details({ data: { placeId: id } });
      if (r.status === "ok") { setProfile(r.profile); setSource({ name: r.name, mapsUri: r.mapsUri, fetchedAt: r.fetchedAt }); setCandidates(null); }
      else if (r.status === "error") setErrorMsg(r.message);
    } catch { setErrorMsg("Não foi possível conectar ao Google. Nenhum resultado foi gerado."); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-white font-display font-bold text-sm">ZM9</div>
            <div>
              <div className="font-display text-[15px] font-bold leading-none text-navy">ZM9 Google Check</div>
              <div className="text-xs font-medium tracking-widest text-electric">PERFIL DA EMPRESA NO GOOGLE</div>
            </div>
          </div>
          <div className="hidden items-center gap-2 text-xs font-medium text-muted-foreground sm:flex">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            {WAITING}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="animate-in rounded-2xl bg-navy p-6 text-white shadow-premium sm:p-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide">
              <Zap className="h-3.5 w-3.5 text-white" />
              AUDITORIA DO PERFIL DA EMPRESA
            </div>
            <h1 className="font-display mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              Diagnóstico do seu <span className="text-electric">Perfil da Empresa no Google</span>
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-[15px]">
              Informe o nome da empresa, a cidade e o estado. A auditoria cobre 10 pontos do perfil, com dados reais e verificáveis. Informações não disponíveis aparecem como "Não verificado".
            </p>
          </div>

          <form onSubmit={handleAnalyze} className="mt-8 flex flex-col gap-3 rounded-xl bg-white p-3 shadow-card md:flex-row md:items-center">
            <label className="flex flex-1 items-center gap-3 rounded-lg border bg-[#F8FAFC] px-3 py-2.5">
              <Building2 className="h-5 w-5 shrink-0 text-muted-foreground" />
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome da empresa" aria-label="Nome da empresa"
                className="w-full bg-transparent text-sm font-medium text-ink placeholder:text-muted-foreground focus:outline-none" />
            </label>
            <label className="flex flex-1 items-center gap-3 rounded-lg border bg-[#F8FAFC] px-3 py-2.5">
              <MapPin className="h-5 w-5 shrink-0 text-muted-foreground" />
              <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Cidade" aria-label="Cidade"
                className="w-full bg-transparent text-sm font-medium text-ink placeholder:text-muted-foreground focus:outline-none" />
            </label>
            <label className="flex items-center gap-3 rounded-lg border bg-[#F8FAFC] px-3 py-2.5 md:w-40">
              <Flag className="h-5 w-5 shrink-0 text-muted-foreground" />
              <select value={uf} onChange={(e) => setUf(e.target.value)} aria-label="Estado (UF)"
                className="w-full bg-transparent text-sm font-medium text-ink focus:outline-none">
                <option value="">Estado (UF)</option>
                {BRAZIL_UFS.map((u) => <option key={u.sigla} value={u.sigla}>{u.sigla} — {u.nome}</option>)}
              </select>
            </label>
            <button type="submit" disabled={!name.trim() || !city.trim() || !uf}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-electric px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-electric-600 disabled:opacity-50">
              Auditar perfil <ArrowRight className="h-4 w-4" />
            </button>
          </form>
          <p className="mt-3 text-center text-xs text-white/60 sm:text-left">Exemplo: Padaria Central — Campinas. Análise não invasiva, sem necessidade de login.</p>
        </div>

        {submitted && (
          <div className="mt-8 animate-in">
            {source ? (
              <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <div className="font-bold">{source.name ?? submitted.name} — {submitted.city} — {submitted.uf}</div>
                  <div className="mt-1">Fonte: {PLACES_SOURCE} • consultado em {new Date(source.fetchedAt).toLocaleString("pt-BR")}{source.mapsUri && <> • <a href={source.mapsUri} target="_blank" rel="noreferrer" className="underline">ver no Google Maps</a></>}</div>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <div className="font-bold">{errorMsg ?? (loading ? "Consultando…" : WAITING)}</div>
                  <div className="mt-1">Busca solicitada: <strong>{submitted.name}</strong> — {submitted.city} — {submitted.uf}. Nenhum dado do Google foi obtido, por isso todos os itens aparecem como "Não verificado". Nenhum resultado é simulado.</div>
                </div>
              </div>
            )}

            {candidates && (
              <div className="no-print mt-4 rounded-xl border bg-white p-4 shadow-card">
                <h3 className="font-display text-sm font-bold text-navy">{candidates.length ? "Selecione o perfil correto" : "Nenhuma empresa encontrada no Google para esta busca."}</h3>
                <ul className="mt-3 space-y-2">
                  {candidates.map((c) => (
                    <li key={c.id}>
                      <button onClick={() => pick(c.id)} disabled={loading} className="flex w-full items-start gap-3 rounded-lg border bg-[#F8FAFC] px-3 py-2.5 text-left text-sm transition hover:border-electric disabled:opacity-50">
                        <Search className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                        <span><strong className="text-ink">{c.name}</strong><span className="block text-xs text-muted-foreground">{c.address ?? "Endereço não informado"}</span></span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-display text-xl font-bold text-navy">10 Pontos de Auditoria</h2>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
                <HelpCircle className="h-3.5 w-3.5" /> {results.filter((r) => r.status === "unverified").length} Não verificados
              </span>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((d) => {
                const cfg = statusConfig(d.status);
                const m = META[d.id]!;
                return (
                  <div key={d.id} className="print-break flex flex-col rounded-xl border bg-white p-5 shadow-card transition hover:shadow-premium">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy text-white">{m.icon}</div>
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${cfg.color}`}>{cfg.icon} {cfg.label}</span>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-navy">{d.id}</span>
                      <h3 className="font-display text-sm font-bold text-navy">{d.title}</h3>
                      <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-navy">Prioridade {m.priority}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.description}</p>
                    <dl className="mt-3 space-y-2 text-xs">
                      <div className="rounded-lg border bg-[#F8FAFC] px-3 py-2">
                        <dt className="font-bold text-ink">Fato confirmado</dt>
                        <dd className="mt-0.5 text-muted-foreground">{d.fact ?? "Nenhum"}</dd>
                      </div>
                      <div className="rounded-lg border bg-[#F8FAFC] px-3 py-2">
                        <dt className="font-bold text-ink">Informação indisponível</dt>
                        <dd className="mt-0.5 text-muted-foreground">{d.unavailable ? (source ? d.unavailable : `${WAITING}.`) : "—"}</dd>
                      </div>
                      <div className="rounded-lg border bg-[#F8FAFC] px-3 py-2">
                        <dt className="font-bold text-ink">Recomendação geral</dt>
                        <dd className="mt-0.5 text-muted-foreground">{d.recommendation ?? m.recommendation}</dd>
                      </div>
                    </dl>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              <div className="rounded-xl border bg-white p-6 shadow-card lg:col-span-2">
                <h3 className="font-display font-bold text-navy">Resumo</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Ainda não há dados reais do Google para este perfil. Quando a fonte de dados estiver conectada, cada ponto mostrará fatos confirmados, recomendações e o que não pôde ser verificado. Nenhuma recomendação garante melhor posicionamento.
                </p>
              </div>
              <div className="rounded-xl bg-navy p-6 text-white shadow-premium">
                <h3 className="font-display font-bold">Pontuação</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">Sem pontuação geral até que a metodologia seja definida e validada.</p>
                <button onClick={() => window.print()} className="no-print mt-4 w-full rounded-lg bg-white px-4 py-2 text-sm font-bold text-navy transition hover:bg-slate-100">Imprimir relatório</button>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-12 border-t pt-6 text-center text-xs text-muted-foreground">
          <p className="font-medium">© {new Date().getFullYear()} ZM9 • Google Check — Auditoria do Perfil da Empresa no Google.</p>
          <p className="mt-1">Somente dados reais e verificáveis. Recomendações baseadas nas diretrizes oficiais do Google.</p>
        </footer>
      </main>
    </div>
  );
}
