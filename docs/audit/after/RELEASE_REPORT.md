# Fix and elevate v3 — Tier 0

- Code commit: `5abeabd` on `polish`, merged by fast-forward to GitHub `main`.
- Shared transparent Logo, slimmer public navigation/footer, consistent control dimensions and brand colours.
- Canonical seed/selectors correct participant balances, provider identity/review metadata, matching and disputes; shared bilingual status/date/money/plural helpers replace raw presentation values.
- Local checks: lint and strict type-check passed; 56 tests and 13 contrast pairs passed; production build passed with no warnings.
- Focused browser checks: 39 cases with no horizontal overflow, multiple visible Mint actions, serious/critical axe issues or page errors. Eight follow-up order cases also pass after improving narrow-screen timeline labels.
- This is an intermediate release. Tier 1–3 remain in `docs/FIX_LOG.md` and `docs/KNOWN_GAPS.md`.

## Production

Vercel production is **Ready**: `dpl_CZNuSMPBFu2hGFrnxVpYWAztJeVA`, `https://nagale-83esz8fzn-mirajulislam1292s-projects.vercel.app`.

Both `https://nagale.app/client` and `https://nagale.vercel.app/client` returned HTTP 200 and rendered the inline SVG Logo and four canonical open briefs. Project-domain API confirms both domains are verified and assigned to `nagale`, with no redirects or branch-specific assignment. The CLI promotion request returned “already current production”; no second promotion was required. DNS/mail records were not changed.

## Source checks

| Check                              | Before | After |
| ---------------------------------- | -----: | ----: |
| font-mono                          |     18 |     0 |
| monospace / ui-monospace           |      0 |     0 |
| uppercase                          |     33 |     0 |
| Internal diagonal arrow            |      0 |     0 |
| Brief ID                           |      1 |     0 |
| ISO literals in components/content |      0 |     0 |
| Blue                               |      0 |     0 |
| Demo trigger (includes comment)    |      2 |     2 |

Demo controls move in Tier 3. Dates remain machine-readable only in seed data and tests. Dynamic visible deadlines use `formatDate`.

## Evidence and limits

- Screenshots: [index](SCREENSHOTS.md), including EN desktop/mobile and BN Gate, Client and Order.
- Browser observations: `tier0-results.json`; final order checks: `order-followup.json`.
- Lighthouse: not run for this intermediate release. The requested single final mobile Lighthouse run is reserved for completion of Tier 3; no old score is presented as a new result.
- API tests exercise the existing mock enforcement through seed state and UI selectors. No backend, real payment or identity-processing claim is made.
- Remaining page restructuring, full bilingual copy migration and admin/review data wiring are explicitly tracked in `docs/KNOWN_GAPS.md`.
