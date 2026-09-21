# React Native Developer Intern - Task Checklist & Implementation Guide

> **Batch 04 • ARKLAB AI Project Brief**  
> **Project Goal:** Build an original, mobile-first insider-activity discovery concept prototype inspired by the broad product category of StockInsider.io using React Native, TypeScript, and locally stored fictional demo data.

---

## 📌 1. Concept Boundary & Originality Rules

- [ ] **Strict Originality:** Design custom navigation, mobile layout, visual hierarchy, signal names, UI wording, colors, cards, filters, charts, and demo data.
- [ ] **Prohibited Content:** Do NOT scrape, copy, or display any actual StockInsider.io UI, screens, wording, filings, data values, or SEC records. No live financial API calls.
- [ ] **Mandatory Safe Wording Statement:**
  > *"Original mobile concept inspired by the broad insider-activity product category; all displayed content is fictional mock/demo data."*

---

## 🏗️ 2. Project Architecture & Directory Structure

- [ ] **Target Directory Tree:**
  ```text
  src/
  ├── data/
  │   └── mockTrades.ts
  ├── types/
  │   └── trade.ts
  ├── navigation/
  │   └── AppNavigator.tsx
  ├── screens/
  │   ├── HomeScreen.tsx
  │   ├── ScreenerScreen.tsx
  │   └── TradeDetailsScreen.tsx
  ├── components/
  │   ├── TradeCard.tsx
  │   ├── FilterChip.tsx
  │   ├── SummaryCard.tsx
  │   ├── SignalBadge.tsx
  │   └── MockActivityChart.tsx
  ├── theme/
  │   └── colors.ts
  └── utils/
      └── formatters.ts
  ```

---

## 💾 3. Data Model & Mock Data Specifications

- [ ] **TypeScript Interface (`src/types/trade.ts`):**
  ```typescript
  export type InsiderTrade = {
    id: string;
    ticker: string;
    company: string;
    sector: string;
    insider: string;
    role: "CEO" | "CFO" | "Director" | "Officer";
    type: "purchase" | "sale";
    transactionCode: "P" | "S";
    shares: number;
    pricePerShare: number;
    value: number;
    transactionDate: string;
    filedAt: string;
    signal: string;
    signalStrength: "High" | "Medium" | "Low";
  };
  ```

- [ ] **Mock Dataset (`src/data/mockTrades.ts`):** Create at least 8 distinct fictional records:
  - [ ] **NOVA** - NovaGrid Systems | CEO • Purchase | $2,400,000 | Large CEO Purchase
  - [ ] **ELIO** - Elio Health Labs | CFO • Sale | $680,000 | Executive Sale
  - [ ] **VOLT** - VoltArc Energy | Director • Purchase | $1,120,000 | Cluster Buy
  - [ ] **AURI** - Auri Cloudworks | Officer • Sale | $240,000 | Routine Sale
  - [ ] **MESA** - Mesa Robotics | CEO • Purchase | $860,000 | Leadership Buy
  - [ ] **LYRA** - Lyra Commerce | CFO • Purchase | $510,000 | CFO Accumulation
  - [ ] **ORBT** - Orbit Transit Tech | Director • Sale | $1,750,000 | Large Sale
  - [ ] **SOLA** - Sola Materials | Director • Purchase | $130,000 | New Position

---

## 🎨 4. Design System Tokens & Styling (`src/theme/colors.ts`)

- [ ] **Color Palette:**
  - `Background`: `#0B1220` or `#111827` (Dark App Shell)
  - `Surface`: `#172033` or `#1F2937` (Cards & Filter Containers)
  - `Text Primary / Secondary`: `#F8FAFC` / `#CBD5E1`
  - `Purchase`: `#22C55E` with `↑ Purchase` badge
  - `Sale`: `#F97316` or `#EF4444` with `↓ Sale` badge
  - `Analytics / Accent`: `#60A5FA` / `#A78BFA` (Charts & Selected Chips)
- [ ] **Layout Rhythms:** 8-point spacing rhythm (`8px`, `12px`, `16px`, `20px`, `24px`).
- [ ] **Card Styling:** `14px–18px` corner radius with subtle border lines.
- [ ] **Responsiveness:** Test on mobile widths (`375px–430px`), avoiding fixed text container widths.

---

## 📱 5. Screen Specifications & Feature Checklist

### Screen 1: Home / Market Pulse (`HomeScreen.tsx`)
- [ ] **Header:** "Market Pulse" title with small `Fictional demo data` badge.
- [ ] **Search Entry Point:** "Search ticker or company" field navigating directly to the Screener (with optional auto-focus).
- [ ] **3 Summary Cards (Calculated from Local Mock Array):**
  - [ ] Card 1 (Transactions): Total demo filings today (e.g. `18 demo filings today`)
  - [ ] Card 2 (Purchase Value): Sum of local purchase values (e.g. `$8.4M demo purchases`)
  - [ ] Card 3 (Sale Value): Sum of local sale values (e.g. `$5.1M demo sales`)
  - [ ] (Optional Card 4): High-strength signals count (`signalStrength === "High"`)
- [ ] **Top Signals Today:** 2–3 signal categories (e.g., "Large CEO Purchase", "Cluster Buy", "Executive Sale").
- [ ] **Latest Activity Feed:** Show at least 4 trade cards containing:
  - [ ] Ticker / Company Name
  - [ ] "Purchase" / "Sale" text + Directional Arrow / Icon
  - [ ] Formatted Transaction Value
  - [ ] Insider Name & Role
  - [ ] Filing Time
  - [ ] Signal-Strength Badge
- [ ] **Navigation CTA:** "View all trades" button leading to Screener.

---

### Screen 2: Latest Trades / Screener (`ScreenerScreen.tsx`)
- [ ] **Search Input:** Case-insensitive search on ticker or company name.
- [ ] **Filter Group 1 (Transaction Type):** `All` | `Purchases` | `Sales`
- [ ] **Filter Group 2 (Insider Role):** `All roles` | `CEO` | `CFO` | `Director` ("Officer" matches under "All roles").
- [ ] **Filter Group 3 (Value Threshold):** `Any` | `$100K+` | `$500K+` | `$1M+`
- [ ] **Dynamic Result Header:** Displays active result count (e.g., "6 results").
- [ ] **Trade Feed:** Shows 6+ matching filtered trade cards.
- [ ] **Actionable Empty State:** Shown when search/filter returns 0 results (e.g., "No fictional demo trades match those filters") with a **"Clear filters"** CTA button.
- [ ] **Navigation:** Tapping any card opens its respective `TradeDetailsScreen`.

---

### Screen 3: Trade Details (`TradeDetailsScreen.tsx`)
- [ ] **Top Header:** Back button + Company Name, Ticker, Sector, and a prominent `FICTIONAL DEMO DATA` badge.
- [ ] **Signal Banner:** Highlight card (e.g., "Large CEO Purchase" • "$2.40M fictional demo insider buy").
- [ ] **Structured Trade Detail Grid:**
  - [ ] Insider (e.g. `Maya Chen • CEO`)
  - [ ] Transaction (e.g. `Purchase ↑ • Code P`)
  - [ ] Shares (e.g. `24,000 shares`)
  - [ ] Price per Share (e.g. `$100.00 (demo)`)
  - [ ] Total Value (e.g. `$2.40M (demo)`)
  - [ ] Transaction Date (e.g. `Sep 10, 2026`)
  - [ ] Filed Date & Time (e.g. `Sep 11, 2026 • 09:24`)
  - [ ] Signal Strength (e.g. `High • Large CEO Purchase`)
- [ ] **Custom 7-Day Visualization (`MockActivityChart.tsx`):**
  - [ ] Built via `react-native-svg` or 7 bar `View` elements.
  - [ ] Clearly labeled **"Mock 7-day activity"**.
- [ ] **Educational Section ("Why this matters"):** Explains generic insider buy significance without making investment claims.
- [ ] **Mandatory Required Disclaimer Box:**
  > *"This prototype uses mock data for demonstration only. Insider-trading filings are public disclosures and do not constitute investment advice. Past activity does not guarantee future stock performance."*

---

## ⏱️ 6. Build Sequence & Time Blocks

- [ ] **Block 1 (0:00–0:30):** Scaffold Expo + TypeScript, set up navigation, define theme & mock trades.
- [ ] **Block 2 (0:30–1:30):** Build `HomeScreen` with summary cards, top signals, latest feed & navigation.
- [ ] **Block 3 (1:30–2:30):** Build `ScreenerScreen` with search, 3 filter groups, list feed & empty state.
- [ ] **Block 4 (2:30–3:20):** Build `TradeDetailsScreen` with grid, signal card, mock chart & disclaimer.
- [ ] **Block 5 (3:20–4:00):** Polish UX, accessibility testing, README preparation, APK build & asset collection.

---

## 🧪 7. Test Checklist & Verification

- [ ] App launches directly to `Market Pulse` with zero red-screen or console errors.
- [ ] Home contains search entry, 3 summaries, top signals, and 4 latest cards.
- [ ] Screener displays 6+ transactions and 3 working independent filter groups.
- [ ] Search correctly matches ticker and company name case-insensitively.
- [ ] Search with no matches displays actionable empty state with "Clear filters".
- [ ] Transaction types (Purchase/Sale) are distinct by text, icon, and color.
- [ ] Every transaction card navigates to the matching Trade Details page.
- [ ] Trade Details renders all metrics, chart visual, educational copy, and mandatory disclaimer.
- [ ] 100% local fictional mock data; zero network/API calls.
- [ ] All icon-only buttons include `accessibilityLabel`.

---

## 📋 8. Submission Assets & Deliverables

- [ ] **README.md Outline:**
  - [ ] Project Overview
  - [ ] Concept and Data Statement
  - [ ] Screens and Features
  - [ ] Tech Stack
  - [ ] Local Setup Guide
  - [ ] Mobile Design Decisions
  - [ ] Known Limitations
  - [ ] AI-Use Disclosure
  - [ ] Deliverables Links
- [ ] **Assets Package:**
  - [ ] Installable Android APK file
  - [ ] Screenshot 1: Home / Market Pulse screen
  - [ ] Screenshot 2: Screener with active filters
  - [ ] Screenshot 3: Details screen with chart & disclaimer
  - [ ] Demo Video (1–3 min) demonstrating full user flow
- [ ] **Participation Email Sent:**
  - **To:** `ahmedsakeeb.work@gmail.com`
  - **CC:** `hrd@arklabai.com`
  - **Subject:** `React Native Developer Intern Batch 04 - {Your Name} - Arklab AI`
