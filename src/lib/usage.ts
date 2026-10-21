/**
 * Usage rules.
 * - Technical API calls (search, details) are logged but never consume plan units.
 * - Only a completed audit (profile successfully read) consumes exactly 1 unit.
 * - No limit is enforced until a plan with a numeric monthly limit is assigned.
 */
export type ApiCallKind = "search" | "details";

export function auditUnitsFor(event: { kind: ApiCallKind; ok: boolean }): 0 | 1 {
  return event.kind === "details" && event.ok ? 1 : 0;
}

export function isOverMonthlyLimit(completedThisMonth: number, monthlyLimit: number | null | undefined): boolean {
  if (monthlyLimit == null) return false;
  return completedThisMonth >= monthlyLimit;
}

export function monthStartUtc(now: Date): string {
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();
}
