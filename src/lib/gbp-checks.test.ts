import { describe, it, expect } from "vitest";
import * as c from "./gbp-checks";

describe("gbp checks", () => {
  it("every check is Não verificado when no data is returned", () => {
    for (const x of c.runAudit({})) {
      expect(x.status).toBe("unverified");
      expect(x.fact).toBeNull();
      expect(x.unavailable).not.toBeNull();
    }
  });
  it("runs exactly 10 checks", () => expect(c.runAudit({})).toHaveLength(10));
  it("missing hours is not a confirmed violation", () => expect(c.checkHours({ regularHours: [] }).status).not.toBe("error"));
  it("low review count is not a confirmed violation", () => expect(c.checkReviews({ reviewCount: 0, ownerReplyRate: 0 }).status).not.toBe("error"));
  it("missing owner replies is not a confirmed violation", () => expect(c.checkReviews({ reviewCount: 10, rating: 4, ownerReplyRate: 0 }).status).not.toBe("error"));
  it("reply rate unknown in public mode is Não verificado", () => expect(c.checkReviews({ reviewCount: 10, rating: 4 }).status).toBe("unverified"));
  it("services are Não verificado in public mode", () => expect(c.checkServices({}).status).toBe("unverified"));
  it("no score function is exported", () => expect("scoreAudit" in c).toBe(false));
});
