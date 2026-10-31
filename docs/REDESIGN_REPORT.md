# Premium redesign

## Tier 1

New Moss hero, display type, working prompt input, composed brief/proposal stack, editorial category rows, four-step sequence with interface fragments, trust rows, server-configured fee example, Mint provider band and Moss footer. Primary/secondary action styles normalised. Marketing header and footer are excluded from workspace routes; compact app bar and mobile bottom navigation added. Provider identity is synchronised with the active workspace. Original API and financial state rules remain intact.

Pattern counts use scripts/pattern-sweep.mjs, scoped to the shared shell/components and three feature modules. Before/after: marketing shell in app 1/0; eyebrow classes 12/0; decorative number markers 9/0; ArrowUpRight references 15/0; targeted repeated demo phrases 5/0. Raw JSON is under qa/redesign. These counts describe the defined source patterns, not all possible occurrences of the English word Demo.

Screenshot index: qa/redesign/before-landing-1280.png and {landing,client,provider,auth,styleguide}-{en,bn}-{360,768,1280}.png. QA JSON records real findings.

## Remaining tiers

Tier 2: conversational intake, live brief, proposals/compare layout, complete order visual treatment, provider feed reasons/reputation, wallet/payout treatment, counterpart/plural fixes.
Tier 3: auth/selfie, attachment/masking UI, verification proof panels, dedicated disputes and admin views, profile tabs/reviews, compact learning catalog, reading pages and broader styleguide. Backend service gaps from KNOWN_GAPS still apply. No claim that those tiers have been completed.

## Verification

41 existing tests passed. Lint and strict type-check/build are run before publishing. Responsive/axe results are saved under qa/redesign/results.json. Lighthouse production results are recorded separately when available. No inferred performance scores are reported.

### Tier 1 verification result

33 initial viewport/locale checks completed with no JavaScript errors. Two mobile attachment-label findings were fixed. Nine targeted follow-up checks passed with no serious/critical axe findings or page overflow. All 41 existing tests passed. Lint, TypeScript and build passed. Screenshot inspection covered the full desktop and mobile landing layouts. Tier 1 is the delivery boundary selected under the work-order credit discipline; Tier 2 and Tier 3 are explicitly outstanding.

### Production measurement and delivery status

Live Tier 1 design verified at https://nagale.vercel.app. Lighthouse mobile: Performance 60, Accessibility 100, Best Practices 100, SEO 92. LCP 2.5s, CLS 0, TBT 1370ms. The performance target is not met, so the hard gate remains incomplete. The report identifies main-thread work (including style/layout and script evaluation) as the primary cost; this has not been corrected or represented as passing. Tier 2 and Tier 3 have not started in this run.

Live provider check: one app bar, zero marketing headers, zero marketing footers. Evidence: qa/redesign/live-landing-preview.png. Full Lighthouse JSON remains local in qa/redesign/lighthouse.json; summary is versioned.
