import { describe, it, expect } from "vitest";
import { checkHours, checkReviews, checkServices, runAudit, scoreAudit } from "./gbp-checks";

describe("gbp checks", () => {
  it("missing hours is Erro", () => expect(checkHours({ regularHours: [] }).status).toBe("error"));
  it("field not returned is Não verificado", () => expect(checkHours({}).status).toBe("unverified"));
  it("low owner reply rate is Atenção", () => expect(checkReviews({ reviewCount: 10, rating: 4.5, ownerReplyRate: 0.2 }).status).toBe("warning"));
  it("public mode cannot verify services", () => expect(checkServices({}).status).toBe("unverified"));
  it("score ignores unverified checks", () => {
    const s = scoreAudit(runAudit({ regularHours: ["seg"] }));
    expect(s.verified).toBe(2); // hours OK + completeness 1/1
    expect(s.score).toBe(100);
  });
  it("empty profile has no score", () => expect(scoreAudit(runAudit({})).score).toBeNull());
});
