/**
 * Provisional test-phase limits (independent of commercial plans).
 * Enforced atomically in the database by reserve_places_call; these values mirror it.
 */
export const TEST_LIMITS = { userSearchesPerDay: 5, userAuditsPerDay: 2, globalCallsPerDay: 20 } as const;

export type DenyReason = "global_daily" | "user_searches_daily" | "user_audits_daily" | "duplicate_search" | "audit_in_progress";

export const DENY_MESSAGES: Record<DenyReason, string> = {
  global_daily: "Limite diário de consultas ao Google atingido. Tente novamente amanhã.",
  user_searches_daily: "Você atingiu o limite de 5 buscas por dia. Tente novamente amanhã.",
  user_audits_daily: "Você atingiu o limite de 2 auditorias por dia. Tente novamente amanhã.",
  duplicate_search: "Esta busca é igual à anterior. Use a lista de resultados já exibida ou altere os dados.",
  audit_in_progress: "Já existe uma auditoria em andamento. Aguarde a conclusão antes de iniciar outra.",
};

export const ACCESS_DENIED_MESSAGE = "Acesso negado. Entre novamente na sua conta para continuar.";

/** Normalizes a search so trivial differences (case, accents, spaces) count as duplicates. */
export function searchKey(name: string, city: string, uf: string): string {
  const n = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").trim();
  return `${n(name)}|${n(city)}|${uf.toUpperCase()}`;
}

export function isDenyReason(v: unknown): v is DenyReason {
  return typeof v === "string" && v in DENY_MESSAGES;
}
