import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { mapCandidates, mapDetails, SEARCH_FIELD_MASK, DETAILS_FIELD_MASK, type PlaceCandidate, type PlaceDetails } from "./places-map";
import type { ProfileData } from "./gbp-checks";
import { isOverMonthlyLimit, monthStartUtc, type ApiCallKind } from "./usage";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_maps/places/v1";

type NotReady = { status: "not_configured" };
type Failed = { status: "error"; message: string };
type Limited = { status: "limit_reached" };

/**
 * Returns credentials only when the Google Maps connector is linked AND paid calls
 * were explicitly enabled (PLACES_ENABLED=true). Otherwise no request is sent.
 */
function creds() {
  const lovable = process.env["LOVABLE_API_KEY"];
  const maps = process.env["GOOGLE_MAPS_API_KEY"];
  if (process.env["PLACES_ENABLED"] !== "true" || !lovable || !maps) return null;
  return { Authorization: `Bearer ${lovable}`, "X-Connection-Api-Key": maps };
}

async function admin() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

/** Logs a technical API call. Never consumes plan units. */
async function logCall(userId: string, kind: ApiCallKind, ok: boolean, httpStatus: number | null, auditId: string | null = null) {
  const db = await admin();
  const { error } = await db.from("api_calls").insert({ user_id: userId, kind, outcome: ok ? "ok" : "error", http_status: httpStatus, audit_id: auditId });
  if (error) console.error("api_calls insert failed", error.message);
}

/** Enforced only when a plan with a numeric monthly limit is assigned. */
async function overLimit(userId: string): Promise<boolean> {
  const db = await admin();
  const { data: up } = await db.from("user_plans").select("plan_id, plans(monthly_audit_limit, active)").eq("user_id", userId).maybeSingle();
  const plan = (up as { plans?: { monthly_audit_limit: number | null; active: boolean } | null } | null)?.plans;
  if (!plan || !plan.active) return false;
  const { count } = await db.from("audits").select("id", { count: "exact", head: true }).eq("user_id", userId).gte("completed_at", monthStartUtc(new Date()));
  return isOverMonthlyLimit(count ?? 0, plan.monthly_audit_limit);
}

async function fail(res: Response): Promise<Failed> {
  const body = await res.text();
  console.error(`Places request failed [${res.status}]: ${body}`);
  return { status: "error", message: `Falha na consulta ao Google (código ${res.status}). Nenhum resultado foi gerado.` };
}

const UF = z.enum(["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]);

export const searchPlaces = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({
    name: z.string().trim().min(1).max(120),
    city: z.string().trim().min(1).max(80),
    uf: UF,
  }).parse(d))
  .handler(async ({ data, context }): Promise<NotReady | Failed | Limited | { status: "ok"; candidates: PlaceCandidate[] }> => {
    const h = creds();
    if (!h) return { status: "not_configured" };
    if (await overLimit(context.userId)) return { status: "limit_reached" };
    try {
      const res = await fetch(`${GATEWAY_URL}/places:searchText`, {
        method: "POST",
        headers: { ...h, "Content-Type": "application/json", "X-Goog-FieldMask": SEARCH_FIELD_MASK },
        body: JSON.stringify({ textQuery: `${data.name}, ${data.city}, ${data.uf}`, languageCode: "pt-BR", regionCode: "BR", pageSize: 5 }),
      });
      await logCall(context.userId, "search", res.ok, res.status);
      if (!res.ok) return fail(res);
      return { status: "ok", candidates: mapCandidates(await res.json()) };
    } catch (e) {
      console.error("Places search error", e);
      await logCall(context.userId, "search", false, null);
      return { status: "error", message: "Não foi possível conectar ao Google. Nenhum resultado foi gerado." };
    }
  });

export const getPlaceProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({
    placeId: z.string().regex(/^[A-Za-z0-9_-]{10,300}$/),
    name: z.string().trim().min(1).max(120),
    city: z.string().trim().min(1).max(80),
    uf: UF,
  }).parse(d))
  .handler(async ({ data, context }): Promise<NotReady | Failed | Limited | { status: "ok"; profile: ProfileData; name: string | null; mapsUri: string | null; fetchedAt: string }> => {
    const h = creds();
    if (!h) return { status: "not_configured" };
    if (await overLimit(context.userId)) return { status: "limit_reached" };
    try {
      const res = await fetch(`${GATEWAY_URL}/places/${data.placeId}?languageCode=pt-BR`, {
        headers: { ...h, "X-Goog-FieldMask": DETAILS_FIELD_MASK },
      });
      if (!res.ok) { await logCall(context.userId, "details", false, res.status); return fail(res); }
      const d = (await res.json()) as PlaceDetails;
      // Completed audit = exactly one unit, regardless of how many API calls it took.
      const db = await admin();
      const { data: audit, error } = await db.from("audits")
        .insert({ user_id: context.userId, business_name: data.name, city: data.city, uf: data.uf, place_id: data.placeId })
        .select("id").single();
      if (error) console.error("audits insert failed", error.message);
      await logCall(context.userId, "details", true, res.status, audit?.id ?? null);
      return { status: "ok", profile: mapDetails(d), name: d.displayName?.text ?? null, mapsUri: d.googleMapsUri ?? null, fetchedAt: new Date().toISOString() };
    } catch (e) {
      console.error("Places details error", e);
      await logCall(context.userId, "details", false, null);
      return { status: "error", message: "Não foi possível conectar ao Google. Nenhum resultado foi gerado." };
    }
  });
