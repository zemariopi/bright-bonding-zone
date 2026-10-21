// Pure audit rules for Google Business Profile data.
// A field that is `undefined` means the source did not return it -> "unverified".

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
  detail: string;
  impact: string;
};

const r = (id: number, title: string, status: CheckStatus, detail: string, impact: string): CheckResult => ({ id, title, status, detail, impact });

export function checkCategories(p: ProfileData): CheckResult {
  const t = "Categorias";
  if (p.primaryCategory === undefined) return r(1, t, "unverified", "Categoria não retornada pela fonte.", "Sem dado não é possível avaliar.");
  if (!p.primaryCategory) return r(1, t, "error", "Sem categoria principal.", "A categoria principal influencia em quais buscas o perfil pode aparecer.");
  if (p.additionalCategories === undefined) return r(1, t, "warning", `Principal: ${p.primaryCategory}. Categorias adicionais não verificadas.`, "Categorias adicionais relevantes podem ampliar as buscas cobertas.");
  return r(1, t, "success", `Principal: ${p.primaryCategory}; ${p.additionalCategories.length} adicional(is).`, "Categorias definidas.");
}

export function checkServices(p: ProfileData): CheckResult {
  const t = "Serviços";
  if (p.services === undefined) return r(2, t, "unverified", "Serviços só podem ser lidos com acesso de proprietário.", "Verificação manual necessária.");
  if (p.services.length === 0) return r(2, t, "warning", "Nenhum serviço cadastrado.", "Serviços ajudam clientes a entender a oferta.");
  return r(2, t, "success", `${p.services.length} serviço(s) cadastrado(s).`, "Serviços informados.");
}

export function checkAddress(p: ProfileData): CheckResult {
  const t = "Endereço e área de atendimento";
  if (p.address === undefined && p.serviceArea === undefined) return r(3, t, "unverified", "Endereço não retornado.", "Sem dado não é possível avaliar.");
  if (!p.address && !(p.serviceArea && p.serviceArea.length)) return r(3, t, "error", "Sem endereço nem área de atendimento.", "Clientes não conseguem localizar a empresa.");
  if (p.address && p.hasMapPin === false) return r(3, t, "warning", "Endereço sem localização no mapa.", "Pode dificultar rotas e buscas próximas.");
  return r(3, t, "success", p.address ?? `Atende: ${p.serviceArea!.join(", ")}`, "Localização informada.");
}

export function checkHours(p: ProfileData): CheckResult {
  const t = "Horário de funcionamento";
  if (p.regularHours === undefined) return r(4, t, "unverified", "Horário não retornado.", "Sem dado não é possível avaliar.");
  if (!p.regularHours || p.regularHours.length === 0) return r(4, t, "error", "Horário não cadastrado.", "Clientes podem não saber quando a empresa está aberta.");
  return r(4, t, "success", `${p.regularHours.length} dia(s) com horário.`, "Horário informado.");
}

export function checkContact(p: ProfileData): CheckResult {
  const t = "Telefone e site";
  if (p.phone === undefined && p.website === undefined) return r(5, t, "unverified", "Contato não retornado.", "Sem dado não é possível avaliar.");
  const missing = [!p.phone && "telefone", !p.website && "site"].filter(Boolean);
  if (missing.length === 2) return r(5, t, "error", "Sem telefone e sem site.", "Clientes não têm como entrar em contato.");
  if (missing.length === 1) return r(5, t, "warning", `Falta: ${missing[0]}.`, "Menos formas de contato disponíveis.");
  return r(5, t, "success", `${p.phone} • ${p.website}`, "Contato completo.");
}

export function checkAttributes(p: ProfileData): CheckResult {
  const t = "Atributos";
  if (p.attributes === undefined) return r(6, t, "unverified", "Atributos não retornados.", "Sem dado não é possível avaliar.");
  const n = Object.keys(p.attributes).length;
  if (n === 0) return r(6, t, "warning", "Nenhum atributo informado.", "Atributos ajudam o cliente a decidir.");
  return r(6, t, "success", `${n} atributo(s) informado(s).`, "Atributos presentes.");
}

export function checkPhotos(p: ProfileData): CheckResult {
  const t = "Fotos";
  if (p.photoCount === undefined) return r(7, t, "unverified", "Fotos não retornadas.", "Sem dado não é possível avaliar.");
  if (p.photoCount === 0) return r(7, t, "error", "Nenhuma foto.", "Perfis sem foto transmitem menos confiança.");
  if (p.photoCount < 5) return r(7, t, "warning", `${p.photoCount} foto(s).`, "Poucas fotos mostram pouco do negócio.");
  return r(7, t, "success", `${p.photoCount} foto(s) encontradas.`, "Fotos presentes. Qualidade requer revisão manual.");
}

export function checkReviews(p: ProfileData): CheckResult {
  const t = "Avaliações e respostas";
  if (p.reviewCount === undefined) return r(8, t, "unverified", "Avaliações não retornadas.", "Sem dado não é possível avaliar.");
  if (p.reviewCount === 0) return r(8, t, "warning", "Nenhuma avaliação.", "Avaliações influenciam a decisão do cliente.");
  const base = `Nota ${p.rating ?? "?"} • ${p.reviewCount} avaliação(ões).`;
  if (p.ownerReplyRate === undefined) return r(8, t, "warning", `${base} Taxa de resposta não verificada.`, "Responder avaliações demonstra atenção ao cliente.");
  if (p.ownerReplyRate < 0.5) return r(8, t, "warning", `${base} ${Math.round(p.ownerReplyRate * 100)}% respondidas.`, "Muitas avaliações sem resposta do proprietário.");
  return r(8, t, "success", `${base} ${Math.round(p.ownerReplyRate * 100)}% respondidas.`, "Boa taxa de resposta.");
}

const COMPLETENESS_FIELDS: (keyof ProfileData)[] = ["primaryCategory", "address", "regularHours", "phone", "website", "description"];

export function checkCompleteness(p: ProfileData): CheckResult {
  const t = "Completude do perfil";
  const known = COMPLETENESS_FIELDS.filter((k) => p[k] !== undefined);
  if (known.length === 0) return r(9, t, "unverified", "Nenhum campo verificável.", "Sem dado não é possível avaliar.");
  const filled = known.filter((k) => { const v = p[k]; return Array.isArray(v) ? v.length > 0 : Boolean(v); });
  const pct = Math.round((filled.length / known.length) * 100);
  const status: CheckStatus = pct === 100 ? "success" : pct >= 70 ? "warning" : "error";
  return r(9, t, status, `${filled.length} de ${known.length} campos verificados preenchidos (${pct}%).`, "Perfis completos oferecem mais informação ao cliente.");
}

export function checkLocalPresence(p: ProfileData): CheckResult {
  const t = "Presença local";
  if (p.localRank === undefined) return r(10, t, "unverified", "Busca local não realizada.", "Informe uma palavra-chave para verificar.");
  if (p.localRank === null) return r(10, t, "warning", "Não apareceu entre os resultados próximos.", "Retrato pontual; não garante nem exclui posicionamento.");
  return r(10, t, "success", `Posição ${p.localRank} na busca próxima (retrato pontual).`, "Posições variam por local e horário da busca.");
}

export function runAudit(p: ProfileData): CheckResult[] {
  return [checkCategories, checkServices, checkAddress, checkHours, checkContact, checkAttributes, checkPhotos, checkReviews, checkCompleteness, checkLocalPresence].map((f) => f(p));
}

/** Score over verified checks only: OK=10, Atenção=5, Erro=0. */
export function scoreAudit(results: CheckResult[]) {
  const verified = results.filter((x) => x.status !== "unverified");
  const pts = verified.reduce((s, x) => s + (x.status === "success" ? 10 : x.status === "warning" ? 5 : 0), 0);
  return { verified: verified.length, total: results.length, score: verified.length ? Math.round((pts / (verified.length * 10)) * 100) : null };
}
