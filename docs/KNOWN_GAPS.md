# Known gaps

The current build is a functional visual prototype, not a completed implementation of every master-spec requirement.

- No real authentication, AI, KYC, upload handling, payments, payout requests, CMS, messaging backend or notifications. No real identity or payment information is collected.
- English complete; Bangla partial. Translation namespaces, parity scripts and full native review remain.
- Admin routes currently share a sample flag-review queue; dedicated verification/users/dispute resolution queues, sanctions and appeals remain.
- Provider profile editing, file attachments/delivery, structured review submission, exact matching and full seed-data volume remain.
- Demo mode is always enabled in this prototype. It must not be enabled for real customer data. There is no production authorisation layer.
- New data resets on reload; only language and brief draft are persisted. Message drafts and a universal unsaved-changes guard remain.
- /styleguide, generated handoff checks, exact design-token audit, full logo/favicon set review, OG image, service worker and analytics interface remain.
- Dependency advisories remain from the pinned dependency versions; audit and remediation are required before real-user launch.
- Lighthouse scores and full screen-reader verification have not been measured. Browser findings and follow-up fixes are recorded in QA_REPORT, without claiming unrun checks.
- The functional prototype source and brand assets are published to the private GitHub repository. The remaining items above are not represented as complete.
