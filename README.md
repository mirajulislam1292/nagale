# Nagale

An interactive frontend prototype for a Bangladesh-focused services marketplace. English is the default. A Bangla toggle translates the landing page, navigation and selected dashboard content; full workspace translation is not complete.

## Run

Use Node 26. Vercel rejected the originally requested Node 20; the owner subsequently authorised resolving the runtime problem and deploying.

`npm ci`, `npm run dev`, `npm run lint`, `npm test`, `npm run build`.

## Review without signing in

Open `/auth` and choose client, provider or admin. These are demonstration roles, not authenticated accounts. A sign-in preview accepts the demo code 123456; it does not send SMS. `/dev/session` resets demo data.

## Architecture

- `src/app`: router, shared layout, locale and role state.
- `src/features`: landing, public information and workspace screens, lazy loaded.
- `src/components`: shared interface elements and the supplied logo.
- `src/types`: public profiles, gigs, proposals, orders, messages and moderation types.
- `src/api`: all state mutations and business-rule enforcement for the mock service.
- `src/mocks`: sample data, imported only through the API boundary.
- `public/brand`, `public/fonts`: extracted vector artwork and self-hosted font files.
- `qa`: actual screenshots, accessibility results and end-to-end result JSON.

The mock store lives in browser memory and resets on reload. Only language preference is persistent; the brief draft uses sessionStorage. No tokens are stored. Money is integer BDT, the fee comes from service configuration, and dates are UTC formatted for Dhaka where dates are displayed.

## Backend integration

Replace functions in `src/api/marketplace.ts` with authenticated requests while preserving the typed results. Authentication, authorisation, masking, transitions and idempotency must be enforced by the real backend. The demo client is not a security boundary. See `docs/BACKEND_HANDOFF.md`.

## Deployment

Vercel project `nagale`, separate from `nagale-coming-soon-bd`. The prototype lives on the assigned Vercel URL. The existing nagale.app domain is not reassigned by this build. Static routes rewrite to index.html. No real payments, identity upload, AI inference, email or SMS are connected.

## Validation

41 unit tests cover contact masking, fee calculations, order transitions and idempotency. The Playwright script checks routes and viewports, runs axe, and completes the proposal-to-payment-release flow. See `docs/QA_REPORT.md` for actual results and limitations. This is not a v0.1.0 claim of full master-spec compliance.
