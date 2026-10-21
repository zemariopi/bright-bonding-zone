import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { mapCandidates, mapDetails, SEARCH_FIELD_MASK, DETAILS_FIELD_MASK, type PlaceCandidate, type PlaceDetails } from "./places-map";
import type { ProfileData } from "./gbp-checks";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_maps/places/v1";

type NotReady = { status: "not_configured" };
type Failed = { status: "error"; message: string };

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

async function fail(res: Response): Promise<Failed> {
  const body = await res.text();
  console.error(`Places request failed [${res.status}]: ${body}`);
  return { status: "error", message: `Falha na consulta ao Google (código ${res.status}). Nenhum resultado foi gerado.` };
}

export const searchPlaces = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({
    name: z.string().trim().min(1).max(120),
    city: z.string().trim().min(1).max(80),
    // 27 unidades federativas do Brasil (26 estados + Distrito Federal).
    uf: z.enum(["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]),
  }).parse(d))
  .handler(async ({ data }): Promise<NotReady | Failed | { status: "ok"; candidates: PlaceCandidate[] }> => {
    const h = creds();
    if (!h) return { status: "not_configured" };
    try {
      const res = await fetch(`${GATEWAY_URL}/places:searchText`, {
        method: "POST",
        headers: { ...h, "Content-Type": "application/json", "X-Goog-FieldMask": SEARCH_FIELD_MASK },
        body: JSON.stringify({ textQuery: `${data.name}, ${data.city}, ${data.uf}`, languageCode: "pt-BR", regionCode: "BR", pageSize: 5 }),
      });
      if (!res.ok) return fail(res);
      return { status: "ok", candidates: mapCandidates(await res.json()) };
    } catch (e) {
      console.error("Places search error", e);
      return { status: "error", message: "Não foi possível conectar ao Google. Nenhum resultado foi gerado." };
    }
  });

export const getPlaceProfile = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ placeId: z.string().regex(/^[A-Za-z0-9_-]{10,300}$/) }).parse(d))
  .handler(async ({ data }): Promise<NotReady | Failed | { status: "ok"; profile: ProfileData; name: string | null; mapsUri: string | null; fetchedAt: string }> => {
    const h = creds();
    if (!h) return { status: "not_configured" };
    try {
      const res = await fetch(`${GATEWAY_URL}/places/${data.placeId}?languageCode=pt-BR`, {
        headers: { ...h, "X-Goog-FieldMask": DETAILS_FIELD_MASK },
      });
      if (!res.ok) return fail(res);
      const d = (await res.json()) as PlaceDetails;
      return { status: "ok", profile: mapDetails(d), name: d.displayName?.text ?? null, mapsUri: d.googleMapsUri ?? null, fetchedAt: new Date().toISOString() };
    } catch (e) {
      console.error("Places details error", e);
      return { status: "error", message: "Não foi possível conectar ao Google. Nenhum resultado foi gerado." };
    }
  });
