# Decisions

- The new master specification supersedes earlier screen and language directions. English is the default and Bangla is explicitly selectable.
- Build in a new isolated project. Existing prototypes are reference material, not dependencies.
- Keep the current public deployment in place until QA and the domain cutover step pass. The first blank pipeline shell gets a separate Vercel URL.
- Demo money uses integer BDT taka; dates use UTC ISO strings and display in Asia/Dhaka.
- Infrastructure must use the owner's verified GitHub identity. A locally configured author name is not proof of GitHub authentication.

## Brand extraction

The PDF artwork is extracted as vector paths through PyMuPDF, with bounded page regions. No logo paths are redrawn. The full lockup in the PDF has a light background and no full dark variant. The onDark component therefore retains the original lockup on its original light surface; it does not recolor the supplied wordmark. Icon exports use the large mint square with white arcs from the source.

## Deployment runtime conflict

Vercel rejected Node 20 as discontinued on the first deployment. The specification fixes Node 20, so changing this requires the owner decision requested in chat. The owner explicitly chose to retain Node 20 and pause deployment. No runtime substitution has been made. GitHub repository and Vercel Git integration are connected. Do not deploy or push further changes to the connected production branch while this pause is active, because pushes can trigger automatic deployment. Local implementation may continue.

## Deployment resumed

The owner subsequently requested fixing the deployment and deploying. This supersedes the deployment pause: Node 26 is selected as explicitly required by the Vercel build error. Node is aligned in package.json, package-lock.json and .nvmrc. Deploy the current shell only to the separate nagale project; do not move nagale.app to an unfinished product.

## Functional prototype delivery

The owner explicitly authorised ignoring small prompt inconsistencies and prioritised completing the working design. Implementation now prioritises a complete visible flow over blocking on exact scaffold order: an English landing page, role selection without sign-in, distinct dashboards, a brief builder, proposals, provider profiles, order transitions, masked messaging, wallet views, verification-state previews and moderation. Unsupported backend actions are labelled as demo rather than pretending to submit documents or move money. No claim of full master-spec completion or v0.1.0 is made.

Unused translation/test libraries were removed. This prototype uses a small locale context and paired copy, with JSON namespace migration explicitly documented as outstanding. Font source packages are retained for the reproducible brand-assets script and their licenses are shipped with the font files.

## Final master prompt, 1 November 2026

- Root is now the one-screen Gate; the editable story lives at /about. This supersedes earlier marketing-root decisions.
- Gate and About share BriefDemo and the existing pure bilingual parser; no live AI is claimed.
- Login phone is carried in sessionStorage to the existing Portal, never in a URL; it is not a credential/token.
- Shared app Layout is lazy-loaded to keep marketing navigation out of the Gate bundle.
- Unknown requests do not fabricate price or category. Sample proposal prices derive from the parsed budget.
- The latest legacy marketplace screens remain available during the route/feed migration; the new /home and social route map is not yet complete.

## Fix and elevate v3

- Reuse the supplied vector glyph paths directly inside Logo; remove the plate and text outlines rather than inventing a new brand mark.
- Retain the existing bilingual copy API and add shared formatter keys; adding react-i18next solely for this tier would change the stack and duplicate working translation state.
- Start polish from the current Gate build and merge current main/premium branch history before editing, preserving deployed fixes.
- A local photography brief does not match Nusrat solely because of its area; the local match exception is the requested Dhanmondi tutoring brief.
- Keep Tier 0 focused on shared presentation and data consistency; preserve API enforcement and reserve page restructuring for the named later tiers.

- Preserved the unrelated old local main as `main-local-before-polish`; created main from origin/main and fast-forwarded tested polish history, without overwriting remote history.
