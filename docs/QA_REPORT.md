# QA report

## Executed

- ESLint and Prettier: passed after implementation.
- Strict TypeScript and production build: passed.
- Vitest: 41 tests passed across two files. Includes Bengali/Latin contact masking, public-field privacy, fee rounding, participant permissions, private-details gating, revision/approval rules and money idempotency.
- Playwright: 21 routes at 320, 768 and 1280 widths, plus a 360px Bangla landing screenshot (64 checks). No browser JavaScript errors.
- End-to-end flow passed: choose proposal → provider acceptance → client funds → provider delivers → client confirms approval → order completed. Results in qa/flow-result.json.
- Screenshots: qa/screenshots. Desktop landing and mobile landing/client dashboard visually inspected.
- Initial axe checks found contrast problems on order steps, verification numerals and course numerals. These colours were darkened. Initial narrow checks found overflow on landing and the two dashboard routes. Follow-up CSS constrains category columns and search controls. Final targeted recheck results are recorded separately; initial JSON is retained as evidence.

## Build sizes (gzip)

Initial JS 76.80 kB; CSS 7.41 kB. Landing chunk 4.63 kB; workspace chunk 9.33 kB; public pages 3.88 kB. Sizes measured by Vite build, not browser performance scores.

## Not claimed

No Lighthouse score, INP/LCP guarantee, full screen-reader pass, full Bangla route pass or complete master-spec compliance. Backend services are mocked. Tests do not prove production authorisation or payment safety.

## Follow-up

All seven targeted live checks returned HTTP 200 and the expected h1. The targeted axe recheck found zero serious/critical violations on those seven checks. Landing had no 320px overflow. The two dashboard checks still exposed a screen-reader-only table label contributing to page scroll width; the label has been positioned at the page origin and a final targeted check follows. The no-sign-in client demo entry passed. Unused-code/dependency checking now passes after pruning unused libraries and marking lazy route modules as entry points.

Final targeted local recheck: landing, client dashboard and provider dashboard each have pageWidth 320 at viewport 320. Results saved to qa/mobile-final.json. The label-position correction resolves the page overflow; the wide order table remains intentionally horizontally scrollable inside its own container.
