// Pure mapping from Google Places API (New) responses to audit ProfileData.
// Any field not present in the response stays `undefined` -> "Não verificado".
import type { ProfileData } from "./gbp-checks";

export const PLACES_SOURCE = "Google Places API (New)";

/** Text Search field mask: only what the selection list needs. */
export const SEARCH_FIELD_MASK = "places.id,places.displayName,places.formattedAddress";

/** Place Details field mask: only fields mapped to the 10 criteria. */
export const DETAILS_FIELD_MASK = [
  "id", "displayName", "formattedAddress", "location", "primaryTypeDisplayName",
  "regularOpeningHours.weekdayDescriptions", "nationalPhoneNumber", "websiteUri",
  "rating", "userRatingCount", "photos.name", "googleMapsUri",
].join(",");

export type PlaceCandidate = { id: string; name: string; address: string | null };

export type PlaceDetails = {
  id?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  location?: { latitude?: number; longitude?: number };
  primaryTypeDisplayName?: { text?: string };
  regularOpeningHours?: { weekdayDescriptions?: string[] };
  nationalPhoneNumber?: string;
  websiteUri?: string;
  rating?: number;
  userRatingCount?: number;
  photos?: { name?: string }[];
  googleMapsUri?: string;
};

export function mapCandidates(json: { places?: { id?: string; displayName?: { text?: string }; formattedAddress?: string }[] }): PlaceCandidate[] {
  return (json.places ?? [])
    .filter((p) => p.id && p.displayName?.text)
    .map((p) => ({ id: p.id!, name: p.displayName!.text!, address: p.formattedAddress ?? null }));
}

/**
 * Places is a public listing source: a field missing from a successful response
 * means the public listing does not show it, so those become `null`/empty.
 * Data Places never exposes (services, attributes, owner replies, additional
 * categories, owner description, local rank) stays `undefined`.
 */
export function mapDetails(d: PlaceDetails): ProfileData {
  return {
    primaryCategory: d.primaryTypeDisplayName?.text ?? null,
    address: d.formattedAddress ?? null,
    hasMapPin: d.location?.latitude !== undefined && d.location?.longitude !== undefined,
    regularHours: d.regularOpeningHours?.weekdayDescriptions ?? null,
    phone: d.nationalPhoneNumber ?? null,
    website: d.websiteUri ?? null,
    photoCount: d.photos?.length ?? 0,
    rating: d.rating ?? null,
    reviewCount: d.userRatingCount ?? 0,
  };
}
