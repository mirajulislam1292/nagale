# Fix and elevate v3

## Tier 0 — foundation (published)

- Transparent SVG Logo uses the original supplied glyph paths with a real bilingual wordmark. Removed the two unused lockup assets.
- Shared buttons now use radius 6, 8px icon gap; OTP is 48×56; selects use Lucide; checkboxes/range/rating use brand colours; aligned public profile and About containers.
- Removed mono classes and forced all-cap classes across components. Shared localized status, date, money, proposal plural and human brief ID helpers.
- Slim public footer; public signup uses Moss. Lite footer uses an explicit On/Off value. Existing API enforcement preserved.
- Canonical seed contains seven orders, participant IDs, timeline/file metadata, correct providers, verification queue, accounts and disputes. Selectors scope client/provider balances, active orders and matches. Profiles use canonical areas/reviews/levels; suspended Kamal is unavailable; messages mirror by sender ID.
- New invariant tests cover balances, queue consistency, account separation, reset copies, matching, and bilingual formatters.

## Tier 1 — next

Gate role switch/live loop/rings, About restructuring, Auth split, compact reading pages and Learning.

## Tier 2 — pending

Social app shell, client composer/intake, proposal selection/compare, role-aware order next steps/escrow and delivery rendering, provider feed layout, wallet presentation.

## Tier 3 — pending

Full messaging and verification/profile redesign, dispute flow, admin interaction polish, Demo dock and production styleguide guard.

## Verification policy

Run shared checks once per tier. Capture only affected key routes, not another 37-route audit. Final Lighthouse runs once after all tiers; no final Lighthouse score is claimed for the intermediate foundation release.

## Tier 0 verification

- Lint, strict type-check, 56 tests, 13 contrast pairs, and production build passed.
- Focused browser check: 39 cases, no horizontal overflow at 360/390, at most one visible Mint action, no serious/critical axe findings in the checked EN/BN routes, no page errors.
- Source counts: `font-mono` 18→0, `uppercase` 33→0, `Brief ID` 1→0; the two messaging demo-trigger occurrences remain for Tier 3.
- Screenshot index: `docs/audit/after/SCREENSHOTS.md`.

## Published Tier 0

- Code commit `5abeabd`, merged and pushed to GitHub main.
- Vercel production `nagale-83esz8fzn-mirajulislam1292s-projects.vercel.app` / `dpl_CZNuSMPBFu2hGFrnxVpYWAztJeVA`: Ready.
- Both `https://nagale.app/client` and `https://nagale.vercel.app/client` returned HTTP 200 with the new inline vector Logo and four canonical open briefs. Domains verified in project `nagale`; DNS/mail records unchanged.
- Stop at the requested tier boundary to limit credit use. Resume at Tier 1. Full v3 is not complete.

## Gate direction update

- Removed the service chips and entire BriefDemo panel from `/` only. About retains its existing independent demo until its own redesign.
- Two English/Bangla headline/subtext pairs rotate every six seconds with a flip transition; hidden tabs, reduced motion and Lite pause rotation.
- Added restrained animated brand rings; retained login, language switch and About navigation.
- This focused update is not completion of the remaining v3 tiers.

Gate validation: lint, strict type-check, build, 56 tests and 13 contrast checks passed. Six EN/BN viewport cases (1280/390/360) have no page scroll, horizontal overflow, demo board or serious/critical axe issues. Copy rotation, Lite pause, reduced-motion pause and phone-to-auth navigation verified. Evidence: `qa/gate-editorial/results.json`.
