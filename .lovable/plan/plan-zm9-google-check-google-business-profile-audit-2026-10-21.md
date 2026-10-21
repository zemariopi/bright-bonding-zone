# Plan: ZM9 Google Check — Google Business Profile audit

## What exists today
- One page (home) with a URL box, an "Analisar agora" button, 10 check cards, a summary, a score (70/100) and a print button.
- All results are hard-coded examples. The button does not analyze anything; the page shows the same fixed results for any URL ("128 páginas indexadas", "12 titles duplicados", score 70). No data is fetched, and nothing is stored or saved anywhere.
- No other pages, no login, no stored history.

## 1. Existing checks: keep, replace, remove
| Current check | Decision |
|---|---|
| Indexação no Google | Remove (website SEO) |
| Sitemap.xml | Remove |
| Robots.txt | Remove |
| Core Web Vitals | Remove |
| Mobile Friendly | Remove |
| HTTPS / SSL | Replace with "Website linked on profile" (reachable, HTTPS), as a side note |
| Metatags SEO | Remove |
| Dados Estruturados | Keep as an optional extra (LocalBusiness data on the linked site), not part of the 10 |
| Links Quebrados | Remove |
| Conteúdo Duplicado | Remove |

Also kept: the layout, the colors, the header, the summary block, the print button and the OK / Atenção / Erro badges. A fourth badge, "Não verificado", is added.

## 2. The 10 Google Business Profile checks
1. Primary and additional categories
2. Services listed
3. Address, map location and service area
4. Opening hours (regular and special)
5. Phone, website and contact details
6. Business attributes
7. Photos (count, recency, owner vs. customer)
8. Reviews: rating, volume, recency, owner replies
9. Profile completeness and consistency (name, description, matching details across fields)
10. Local presence: whether the profile appears on Google Maps and in nearby search, when this can be checked

## 3. Where the real data comes from
- **Public mode (any business):** Google Maps Places API (New), through Lovable's Google Maps connector. The user types the business name and city, or pastes a Maps link, then picks the right business from a list. This returns the name, address, location, primary type, phone, website, hours, rating, review count, up to 5 reviews, photo references and some attributes.
- **Owner mode (profiles the user manages):** Google Business Profile API, through Lovable's Business Profile connector with the owner's Google sign-in. This returns all categories, services, service area, special hours, the full description, every review with owner replies, photos and verification status.
- **Linked website (side note only):** a direct request to the website on the profile, checking that it loads, uses HTTPS and has LocalBusiness data.
- Nothing is made up. If a field can't be read, the check shows "Não verificado" and says why.

## 4. What runs automatically vs. what needs access
| Check | Public mode | Owner mode |
|---|---|---|
| 1 Categories | Partial: primary type only | Full |
| 2 Services | Not available (manual) | Full |
| 3 Address / area | Address and pin: yes. Service area: no | Full |
| 4 Hours | Regular hours: yes | Regular and special hours |
| 5 Contact | Yes | Yes |
| 6 Attributes | Partial | Full |
| 7 Photos | Count and references only | Full, including dates |
| 8 Reviews | Rating, total and 5 sample reviews; reply rate can't be measured | Full, including reply rate |
| 9 Completeness | Partial (fields Places returns) | Full |
| 10 Local presence | Nearby search for a keyword the user gives; the position is a snapshot, not a ranking promise | Same, plus search impressions from the Performance API |

Rules shown in the report:
- Confirmed problems and unverified items are listed separately.
- Each finding gets a "likely impact" note. No finding promises better rankings.
- Recommendations link to Google's official guidelines.
- The score uses verified checks only and shows how much of the profile was checked (for example, "7 of 10 checks verified").

## 5. Files and components affected
- `src/routes/index.tsx`: new search input (business plus city, or a Maps link), a list to pick the business, real results, the "Não verificado" badge, and a score based on verified data. The fixed example data is removed.
- New `src/lib/gbp-checks.ts`: the rules for the 10 checks. Pure functions, with tests.
- New `src/lib/gbp-checks.test.ts`: one test per rule, for example "no owner replies leads to Atenção", "missing hours leads to Erro", "field not returned leads to Não verificado".
- New `src/server/places.functions.ts`: server functions that call the Maps and Business Profile connectors. Keys stay on the server.
- `src/routes/__root.tsx`: page title and description for the new focus.
- Optional, later: Lovable Cloud to save past audits (only if you want history).

## 6. How existing functionality is protected
- The visual identity, header, summary layout and print button stay.
- There is no stored data today, so nothing can be lost. If history is added later, it starts empty and nothing gets overwritten.
- The current page can be restored from version history at any time.
- Work goes in steps: (a) check rules and tests, (b) public mode, (c) owner mode. You approve each step before it ships.
- No package updates, database changes or publishing without your approval.

## Decisions needed before starting
- Public mode only, or public and owner modes?
- Connect the Google Maps connector now? Places API usage is billed through Google.
