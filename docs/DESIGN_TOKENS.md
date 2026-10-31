# Design tokens

The original PDF is the source of the logo artwork. Vector crops were extracted with PyMuPDF and optimised with SVGO. The mark is used unchanged beside the English name in the primary navigation. Original bilingual full-lockup variants are retained in the shared Logo component.

Palette: Mint #3FD3A2, Moss #0C2A24, Deep Mint #0F7A5C, Mist #F3F7F5, White #FFFFFF. Supporting lines and text are muted green-grey; amber is reserved for review status. Body copy uses Moss or #576C65 on light surfaces, never mint on white.

Inter 400/500/700 and Noto Sans Bengali 400/500/700 are self-hosted in public/fonts. Main layouts use a 1200px content area, a 240px workspace sidebar, and responsive single-column fallbacks. Components use 6/12/20px principal radii; avatars are circular. The implementation currently has a few 8px helper radii and extra type sizes; exact master-token consolidation remains a documented gap.

Keyboard focus is visible, interactive buttons have 44px minimum height, the page has a skip link and one h1, and route navigation restores focus to the h1. Compact suggestions and some secondary text controls still need full target-size auditing. Lite mode removes the landing preview, portfolio artwork, shadows and animation. Reduced motion is supported.

## Premium redesign — Tier 1

Display: English 72px / 44px mobile, 1.05 line-height, -0.03em tracking. Bengali 64px / 40px mobile, 1.3 line-height, zero tracking. Section 40, subsection 28, lead 20, body 16, small 14, caption 12. Tailwind exposes display. `/styleguide` demonstrates the scale, actions and states in either locale.

Primary action: Mint fill with Moss text. Strong neutral action: Moss fill with white text. Secondary action: outline. App bar is 56px; desktop sidebar 240px; mobile workspace navigation is fixed to the bottom. Landing uses two Moss sections, editorial category rows and one full-width Mint provider band. Minimum public section rhythm is 128px desktop and 72px mobile.
