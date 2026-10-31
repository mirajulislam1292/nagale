# Nagale Design Tokens

Canonical design tokens defined in `src/lib/tokens.ts` and exported to `tailwind.config.js`.

## 1. Color Palette

| Token         | Hex       | Role                                          | Contrast Ratio on White / Mist          |
| ------------- | --------- | --------------------------------------------- | --------------------------------------- |
| **Mint**      | `#3FD3A2` | Primary action button fill, highlight borders | 8.05:1 (with Moss text on top)          |
| **Moss**      | `#0C2A24` | Primary brand surface, headlines, body text   | 15.30:1 on White / 14.16:1 on Mist      |
| **Moss-600**  | `#38524B` | Secondary body text, captions                 | 6.65:1 on White                         |
| **Moss-500**  | `#576C65` | Muted metadata, minimum accessible text       | 5.19:1 on White / 4.80:1 on Mist        |
| **Deep Mint** | `#0F7A5C` | Interactive links, brand icons                | 5.30:1 on White                         |
| **Deep-700**  | `#0A5C45` | Step-adjusted success text token              | 6.77:1 on Deep-100 (Success background) |
| **Mist**      | `#F3F7F5` | Primary page background, subtle panels        | 14.16:1 against Moss                    |
| **White**     | `#FFFFFF` | Input surfaces, cards, modals                 | 15.30:1 against Moss                    |

### Semantic Status Colors

| State       | Text Token | Background Token | Measured Contrast     |
| ----------- | ---------- | ---------------- | --------------------- |
| **Warning** | `#7A5200`  | `#FBF3E0`        | 6.26:1 (WCAG AA pass) |
| **Danger**  | `#9A2F2F`  | `#FBECEA`        | 6.48:1 (WCAG AA pass) |
| **Success** | `#0A5C45`  | `#DCF1EA`        | 6.77:1 (WCAG AA pass) |
| **Info**    | `#38524B`  | `#E2EDE8`        | 5.59:1 (WCAG AA pass) |

> [!NOTE]
> Contrast is verified by `scripts/check-contrast.mjs` running as part of `npm run test`. Mint text is strictly forbidden on White or Mist.

---

## 2. Typography Scale

Fonts:

- Latin: **Inter** (400 Regular, 500 Medium, 700 Bold)
- Bengali: **Noto Sans Bengali** (400 Regular, 500 Medium, 700 Bold)
- Monospace / Tabular: `font-variant-numeric: tabular-nums`

| Level     | Size (Desktop / Mobile) | Line Height | Tracking                     |
| --------- | ----------------------- | ----------- | ---------------------------- |
| `display` | 72px / 44px             | 1.05        | -0.03em (Latin) / 0 (Bangla) |
| `h1`      | 48px / 36px             | 1.15        | -0.02em                      |
| `h2`      | 36px / 28px             | 1.20        | -0.015em                     |
| `h3`      | 28px / 22px             | 1.25        | -0.01em                      |
| `h4`      | 22px / 18px             | 1.30        | -0.005em                     |
| `body`    | 16px                    | 1.50        | 0                            |
| `small`   | 14px                    | 1.45        | 0                            |
| `caption` | 12px                    | 1.40        | +0.01em                      |

---

## 3. Border Radii & Elevation

### Radii

- `rounded-sm`: **6px** (buttons, input fields, badges, segmented control items)
- `rounded-md`: **12px** (cards, panels, dropzones)
- `rounded-xl`: **20px** (large modals, hero preview containers)
- `rounded-full`: Avatars, circular indicators only

### Elevations

- `shadow-e1`: `0 1px 3px rgba(12, 42, 36, 0.08), 0 1px 2px rgba(12, 42, 36, 0.04)` (Cards, dropdowns)
- `shadow-e2`: `0 8px 24px rgba(12, 42, 36, 0.12), 0 2px 6px rgba(12, 42, 36, 0.06)` (Modals, popovers)

---

## 4. Spacing & Rhythm

- Minimum tap target: **44px**
- Public section spacing: **128px** desktop, **72px** mobile
- Layout container width: `1200px` (public/landing), `1120px` (app workspaces)
