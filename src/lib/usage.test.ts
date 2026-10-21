import { describe, it, expect } from "vitest";
import { auditUnitsFor, isOverMonthlyLimit, monthStartUtc } from "./usage";

describe("usage rules", () => {
  it("a search call consumes no audit unit", () => expect(auditUnitsFor({ kind: "search", ok: true })).toBe(0));
  it("a completed audit (details ok) consumes exactly 1 unit", () => expect(auditUnitsFor({ kind: "details", ok: true })).toBe(1));
  it("a failed details call consumes no unit", () => expect(auditUnitsFor({ kind: "details", ok: false })).toBe(0));
  it("search + details of one audit total 1 unit", () =>
    expect(auditUnitsFor({ kind: "search", ok: true }) + auditUnitsFor({ kind: "details", ok: true })).toBe(1));
  it("no plan means no limit is applied", () => expect(isOverMonthlyLimit(10_000, null)).toBe(false));
  it("limit blocks once reached", () => expect(isOverMonthlyLimit(5, 5)).toBe(true));
  it("month starts on day 1 UTC", () => expect(monthStartUtc(new Date("2026-10-21T21:00:00Z"))).toBe("2026-10-01T00:00:00.000Z"));
});
