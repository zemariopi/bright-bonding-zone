// Pure audit rules for Google Business Profile data (Phase 1: rules only, no data source).
// A field that is `undefined` means the source did not return it -> "unverified" (Não verificado).
// No overall score is computed until a scoring methodology is defined and validated.

export type CheckStatus = "success" | "warning" | "error" | "unverified";

export type ProfileData = {
  primaryCategory?: string | null;
  additionalCategories?: string[];
  services?: string[];
  address?: string | null;
  hasMapPin?: boolean;
  serviceArea?: string[];
  regularHours?: string[] | null;
  phone?: string | null;
  website?: string | null;
  attributes?: Record<string, boolean>;
  photoCount?: number;
  rating?: number | null;
  reviewCount?: number;
  ownerReplyRate?: number; // 0..1, owner mode only
  description?: string | null;
  localRank?: number | null; // position in nearby search, null = not found
};

export type CheckResult = {
  id: number;
  title: string;
  status: CheckStatus;
  /** Confirmed fact read from the source, or null when nothing was confirmed. */
  fact: string | null;
  /** Suggestion aligned with Google guidelines; never a ranking promise. */
  recommendation: string | null;
  /** What could not be verified and why, or null when all needed data was available. */
  unavailable: string | null;
  impact: string | null;
};

type Parts = Partial<Pick<CheckResult, "fact" | "recommendation" | "unavailable" | "impact">>;
const r = (id: number, title: string, status: CheckStatus, p: Parts): CheckResult => ({
  id, title, status,
  fact: p.fact ?? null, recommendation: p.recommendation ?? null,
  unavailable: p.unavailable ?? null, impact: p.impact ?? null,
});
const NA = "Dado não retornado pela fonte consultada.";

export function checkCategories(p: ProfileData): CheckResult {
  const t = "Categorias";
  if (p.primaryCategory === undefined) return r(1, t, "unverified", { unavailable: NA });
  if (!p.primaryCategory) return r(1, t, "error", { fact: "O perfil não tem categoria principal.", recommendation: "Definir a categoria principal que melhor descreve o negócio.", impact: "A categoria principal ajuda o Google a entender o tipo de negócio." });
  if (p.additionalCategories === undefined) return r(1, t, "success", { fact: `Categoria principal: ${p.primaryCategory}.`, unavailable: "Categorias adicionais exigem acesso de proprietário." });
  return r(1, t, "success", { fact: `Categoria principal: ${p.primaryCategory}; ${p.additionalCategories.length} adicional(is).` });
}

export function checkServices(p: ProfileData): CheckResult {
  const t = "Serviços";
  if (p.services === undefined) return r(2, t, "unverified", { unavailable: "Serviços só podem ser lidos com acesso de proprietário." });
  if (p.services.length === 0) return r(2, t, "warning", { fact: "Nenhum serviço cadastrado.", recommendation: "Considerar cadastrar os serviços oferecidos.", impact: "Serviços ajudam clientes a entender a oferta." });
  return r(2, t, "success", { fact: `${p.services.length} serviço(s) cadastrado(s).` });
}

export function checkAddress(p: ProfileData): CheckResult {
  const t = "Endereço e área de atendimento";
  if (p.address === undefined && p.serviceArea === undefined) return r(3, t, "unverified", { unavailable: NA });
  if (!p.address && !p.serviceArea?.length) {
    if (p.serviceArea === undefined) return r(3, t, "unverified", { fact: "Sem endereço público.", unavailable: "A área de atendimento exige acesso de proprietário." });
    return r(3, t, "error", { fact: "Sem endereço e sem área de atendimento.", recommendation: "Informar endereço ou área de atendimento.", impact: "Clientes podem não saber onde a empresa atende." });
  }
  if (p.address && p.hasMapPin === false) return r(3, t, "warning", { fact: `Endereço: ${p.address}. Sem localização no mapa.`, recommendation: "Conferir o marcador no mapa.", impact: "Pode dificultar rotas." });
  return r(3, t, "success", { fact: p.address ? `Endereço: ${p.address}.` : `Atende: ${p.serviceArea!.join(", ")}.` });
}

export function checkHours(p: ProfileData): CheckResult {
  const t = "Horário de funcionamento";
  if (p.regularHours === undefined) return r(4, t, "unverified", { unavailable: NA });
  if (!p.regularHours || p.regularHours.length === 0)
    return r(4, t, "warning", { fact: "Nenhum horário retornado.", recommendation: "Conferir no perfil se o horário está cadastrado.", impact: "Clientes podem não saber quando a empresa está aberta." });
  return r(4, t, "success", { fact: `${p.regularHours.length} dia(s) com horário.` });
}

export function checkContact(p: ProfileData): CheckResult {
  const t = "Telefone e site";
  if (p.phone === undefined && p.website === undefined) return r(5, t, "unverified", { unavailable: NA });
  const missing = [p.phone === null || p.phone === "" ? "telefone" : null, p.website === null || p.website === "" ? "site" : null].filter(Boolean);
  const unknown = [p.phone === undefined && "telefone", p.website === undefined && "site"].filter(Boolean);
  const facts = [p.phone && `Telefone: ${p.phone}`, p.website && `Site: ${p.website}`].filter(Boolean).join(" • ");
  return r(5, t, missing.length ? "warning" : "success", {
    fact: [facts, missing.length ? `Sem ${missing.join(" e ")}.` : ""].filter(Boolean).join(". ") || null,
    recommendation: missing.length ? `Considerar adicionar ${missing.join(" e ")}.` : null,
    unavailable: unknown.length ? `Não verificado: ${unknown.join(" e ")}.` : null,
    impact: missing.length ? "Menos formas de contato disponíveis." : null,
  });
}

export function checkAttributes(p: ProfileData): CheckResult {
  const t = "Atributos";
  if (p.attributes === undefined) return r(6, t, "unverified", { unavailable: NA });
  const n = Object.keys(p.attributes).length;
  if (n === 0) return r(6, t, "warning", { fact: "Nenhum atributo retornado.", recommendation: "Revisar atributos aplicáveis ao negócio." });
  return r(6, t, "success", { fact: `${n} atributo(s) informado(s).` });
}

export function checkPhotos(p: ProfileData): CheckResult {
  const t = "Fotos";
  if (p.photoCount === undefined) return r(7, t, "unverified", { unavailable: NA });
  const quality = "Qualidade e data das fotos exigem revisão manual.";
  if (p.photoCount === 0) return r(7, t, "warning", { fact: "Nenhuma foto retornada.", recommendation: "Considerar adicionar fotos reais do negócio.", unavailable: quality });
  return r(7, t, "success", { fact: `${p.photoCount} foto(s) retornada(s).`, unavailable: quality });
}

export function checkReviews(p: ProfileData): CheckResult {
  const t = "Avaliações e respostas";
  if (p.reviewCount === undefined) return r(8, t, "unverified", { unavailable: NA });
  const fact = `Nota ${p.rating ?? "não informada"} • ${p.reviewCount} avaliação(ões).`;
  if (p.ownerReplyRate === undefined) return r(8, t, "unverified", { fact, unavailable: "Taxa de resposta do proprietário exige acesso de proprietário." });
  const pct = Math.round(p.ownerReplyRate * 100);
  if (p.ownerReplyRate < 0.5) return r(8, t, "warning", { fact: `${fact} ${pct}% respondidas.`, recommendation: "Considerar responder às avaliações.", impact: "Respostas mostram atenção aos clientes." });
  return r(8, t, "success", { fact: `${fact} ${pct}% respondidas.` });
}

const COMPLETENESS_FIELDS: (keyof ProfileData)[] = ["primaryCategory", "address", "regularHours", "phone", "website", "description"];

export function checkCompleteness(p: ProfileData): CheckResult {
  const t = "Completude do perfil";
  const known = COMPLETENESS_FIELDS.filter((k) => p[k] !== undefined);
  const unknown = COMPLETENESS_FIELDS.length - known.length;
  if (known.length === 0) return r(9, t, "unverified", { unavailable: NA });
  const filled = known.filter((k) => { const v = p[k]; return Array.isArray(v) ? v.length > 0 : Boolean(v); });
  const empty = known.length - filled.length;
  return r(9, t, empty ? "warning" : "success", {
    fact: `${filled.length} de ${known.length} campos verificados estão preenchidos.`,
    recommendation: empty ? "Preencher os campos vazios." : null,
    unavailable: unknown ? `${unknown} campo(s) não verificado(s).` : null,
  });
}

export function checkLocalPresence(p: ProfileData): CheckResult {
  const t = "Presença local";
  if (p.localRank === undefined) return r(10, t, "unverified", { unavailable: "Busca local não realizada." });
  if (p.localRank === null) return r(10, t, "warning", { fact: "Não apareceu nos resultados da busca próxima consultada.", impact: "Retrato pontual; resultados variam por local e horário." });
  return r(10, t, "success", { fact: `Posição ${p.localRank} na busca próxima consultada.`, impact: "Retrato pontual; não garante posicionamento." });
}

export function runAudit(p: ProfileData): CheckResult[] {
  return [checkCategories, checkServices, checkAddress, checkHours, checkContact, checkAttributes, checkPhotos, checkReviews, checkCompleteness, checkLocalPresence].map((f) => f(p));
}
