import { describe, it, expect } from "vitest";
import { mapDetails, mapCandidates } from "./places-map";
import { runAudit } from "./gbp-checks";

describe("places mapping", () => {
  it("keeps owner-only criteria as Não verificado", () => {
    const res = runAudit(mapDetails({ formattedAddress: "Rua A, 1", rating: 4.5, userRatingCount: 10 }));
    expect(res.find((r) => r.id === 2)!.status).toBe("unverified"); // services
    expect(res.find((r) => r.id === 6)!.status).toBe("unverified"); // attributes
    expect(res.find((r) => r.id === 10)!.status).toBe("unverified"); // local presence
  });
  it("drops candidates without id or name", () => {
    expect(mapCandidates({ places: [{ id: "x" }, { id: "abc", displayName: { text: "Padaria" } }] })).toEqual([{ id: "abc", name: "Padaria", address: null }]);
  });
});
