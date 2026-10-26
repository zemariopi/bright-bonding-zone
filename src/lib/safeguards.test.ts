import { describe, it, expect } from "vitest";
import { TEST_LIMITS, searchKey, DENY_MESSAGES } from "./safeguards";

describe("provisional test-phase limits", () => {
  it("5 searches per user per day", () => expect(TEST_LIMITS.userSearchesPerDay).toBe(5));
  it("2 completed audits per user per day", () => expect(TEST_LIMITS.userAuditsPerDay).toBe(2));
  it("20 Google calls per day globally", () => expect(TEST_LIMITS.globalCallsPerDay).toBe(20));
  it("same search with different case/accents/spaces is a duplicate", () =>
    expect(searchKey("Espaço  Varandas", "goianira", "go")).toBe(searchKey("espaco varandas", "Goianira ", "GO")));
  it("different city is not a duplicate", () =>
    expect(searchKey("Espaço Varandas", "Goiânia", "GO")).not.toBe(searchKey("Espaço Varandas", "Goianira", "GO")));
  it("every denial has a Portuguese message", () => expect(Object.keys(DENY_MESSAGES)).toHaveLength(5));
});
