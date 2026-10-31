# Nagale Component Library

Comprehensive UI primitives and marketplace components built with Tailwind CSS, strict TypeScript, and WCAG AA compliance.

## Layout Components

### `LayoutContainer`

- **Location:** `src/components/layout/LayoutContainer.tsx`
- **Purpose:** Enforces strict width rhythm across all 36 routes.
- **Variants:**
  - `page` (default): Max width `1200px` for landing and public pages.
  - `app`: Max width `1120px` for authenticated workspace views.
- **Gutters:** 16px (mobile 360px), 24px (tablet 768px), 32px (desktop 1280px).

### `PublicHeader`

- **Location:** `src/components/layout/PublicHeader.tsx`
- **Height:** 64px sticky. Includes responsive drawer for mobile viewports, language toggle (EN | বাংলা), and semantic navigation links.

### `WorkspaceNav` (`AppBar`, `Sidebar`, `BottomTabs`)

- **Location:** `src/components/layout/WorkspaceNav.tsx`
- **Desktop:** 56px AppBar with 240px Sidebar.
- **Mobile:** Fixed 60px BottomTabs navigation with 44px touch targets.

### `Footer`

- **Location:** `src/components/layout/Footer.tsx`
- **Surface:** Moss background with 4 columns, Lite mode toggle, and language selector.

---

## UI Primitives (`src/components/ui/`)

### `Button`

- **Variants:**
  - `primary`: Mint (`#3FD3A2`) background with Moss text (`#0C2A24`).
  - `strong`: Moss (`#0C2A24`) background with White text.
  - `secondary`: White background with Moss border and text.
  - `tertiary`: Ghost button with subtle hover state.
- **Heights:** 36px (sm), 44px (md), 52px (lg).
- **Rules:** 44px minimum touch targets, visible keyboard focus rings.

### `Badge`

- **Types:**
  - `VerifiedBadge` (Levels 1, 2, 3 with ShieldCheck icon).
  - `DigitalBadge` & `LocalBadge` (Gig classification).
  - `OrderStatusBadge` (6 order lifecycle states).
  - `RiskBadge` (low, medium, high).
  - Semantic `Badge` (`tone`: `'neutral' | 'success' | 'warning' | 'danger' | 'info'`).

### `Card` & `StatTile`

- **Card Variants:** `flat` (white with border), `raised` (elevation e1), `moss` (dark surface).
- **StatTile:** Strict tabular figures (`tabular-nums`), descriptive sublabel (no filler text), optional icons.

### `Input` Controls

- `Input` & `Textarea`: Accessible labels, error states, and hints.
- `PhoneInput`: Prefixed with Bangladesh country code (+880) and 10-digit mobile number validation.
- `OtpInput`: 6 distinct input boxes with keyboard navigation, paste, and auto-focus.
- `MoneyInput`: Tabular figures with currency symbol prefix (`৳`).
- `SegmentedControl`: Radio toggle replacement with smooth selection state.
- `Switch` & `Checkbox`: Accessible toggle controls.

### `FileDropzone`

- **Location:** `src/components/ui/FileDropzone.tsx`
- **Capabilities:** Drag-and-drop file upload with mime type validation, file size check, and progress indicator.

### `Avatar` & `Rating`

- **Avatar:** Sizes `sm` (32px), `md` (40px), `lg` (48px), `xl` (64px), initials fallback.
- **Rating:** Tabular score, 5-star SVG representation, and count summary.

### `Feedback` (`Modal`, `Toast`, `Skeleton`, `EmptyState`)

- **Modal:** Accessible dialog with Escape key handler and backdrop click dismissal.
- **Toast:** Slide-in alert system with auto-dismissal.

---

## Marketplace Specialized Components

### `OrderTimeline`

- **Location:** `src/components/ui/OrderTimeline.tsx`
- **6-step order lifecycle:**
  1. Accepted
  2. Escrow Funded
  3. Details Unlocked
  4. Delivered
  5. Review & Approval
  6. Payout Completed

### `JobBriefCard`

- **Location:** `src/components/ui/JobBriefCard.tsx`
- Structured job summary showing Category, Digital/Local tag, Deliverable, Budget, Deadline, and Scope.

### `ProposalCard` & `ProposalCompareTable`

- **Location:** `src/components/ui/ProposalCard.tsx`
- Proposal card with price, ETA, samples count, shortlist toggle, and side-by-side comparison matrix.

### `MarketplaceComponents`

- **Location:** `src/components/ui/MarketplaceComponents.tsx`
- `FeeBreakdown`: Transparent calculation showing Gross, 10% Fee, and Provider Net.
- `EscrowSummary`: Dark moss summary card displaying held funds and release conditions.
- `DeliveryPreview`: Watermarked preview container preventing unauthorized asset downloads before signoff.
- `MaskingNotice`: Privacy warning banner with nudge, warning, and soft-block tiers.
