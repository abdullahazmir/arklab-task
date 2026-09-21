# MarketPulse Insider Discovery Prototype

> **Batch 04 • ARKLAB AI Project Brief**  
> **Original Mobile Insider-Activity Discovery Concept Prototype**

---

## 📌 Concept & Fictional Data Statement

> *"Original mobile concept inspired by the broad insider-activity product category; all displayed content is fictional mock/demo data."*

**MarketPulse** is an original mobile-first insider-activity discovery concept prototype built with React Native, Expo, and TypeScript. This application demonstrates how investors and analysts can track executive market activity, filter filing records, and interpret high-conviction insider trading signals via an intuitive mobile interface.

**Strict Compliance & Originality Notice:**
- 100% locally stored fictional mock data.
- Zero live financial API calls, web scraping, or SEC filing retrieval.
- Original UI layout, visual design system, navigation hierarchy, signal names, and component code.

---

## 📱 Screens & Feature Specifications

### 1. Market Pulse (`HomeScreen.tsx`)
- **Header & Safe Wording:** Displays "Market Pulse" branding alongside an explicit `MOCK DEMO DATA` badge and safe wording statement.
- **Search Entry Point:** Quick search bar that navigates directly to the screener with pre-populated queries.
- **Calculated Metric Cards:**
  - **Demo Filings:** Total mock transactions recorded today (`10`).
  - **Total Purchases:** Aggregate dollar value of fictional buy transactions (e.g. `$9.20M`).
  - **Total Sales:** Aggregate dollar value of fictional sell transactions (e.g. `$3.61M`).
  - **High Signals:** Count of high-strength insider signal alerts.
- **Top Signals Today:** Instant filter shortcuts for categories like *Large CEO Purchase*, *Cluster Buy*, and *Executive Sale*.
- **Latest Filings Feed:** Cards detailing recent fictional transactions with ticker, executive role, transaction direction, dollar value, filing date, and signal strength.

### 2. Latest Trades & Screener (`ScreenerScreen.tsx`)
- **Case-Insensitive Search:** Instant filtering across company tickers (e.g. `NOVA`, `ELIO`), company names, executive names, or signal titles.
- **3 Independent Filter Groups:**
  1. **Transaction Type:** `All` | `Purchases` | `Sales`
  2. **Insider Role:** `All roles` | `CEO` | `CFO` | `Director`
  3. **Minimum Value Threshold:** `Any` | `$100K+` | `$500K+` | `$1M+`
- **Dynamic Result Header:** Displays real-time matching record counts (e.g. `Showing 6 demo filings`).
- **Actionable Empty State:** Clear empty state UI when 0 records match combined filters, featuring a **"Clear All Filters"** button.

### 3. Trade Details (`TradeDetailsScreen.tsx`)
- **Header & Navigation:** Back button, company ticker badge, company name, sector, and prominent `FICTIONAL DEMO DATA` tag.
- **Signal Banner:** Highlighted banner card summarizing the signal type and transaction magnitude.
- **Structured Metric Grid:** 8 key parameters including Insider Name, Executive Role, SEC Transaction Code (`P`/`S`), Volume (shares), Price per Share, Total Value, Transaction Date, and Filing Time.
- **Custom 7-Day Visual Chart (`MockActivityChart.tsx`):** Custom 7-bar chart visual clearly labeled **"Mock 7-day activity"**, highlighting peak daily activity density.
- **Educational Section:** "Why This Signal Matters" explaining the generic market significance of insider buying vs. selling without providing investment advice.
- **Mandatory Legal Disclaimer:** Prominently formatted legal box adhering strictly to project guidelines:
  > *"This prototype uses mock data for demonstration only. Insider-trading filings are public disclosures and do not constitute investment advice. Past activity does not guarantee future stock performance."*

---

## 🛠️ Tech Stack

- **Framework:** React Native (v0.86) + Expo SDK 57
- **Language:** TypeScript 5.x
- **Navigation:** React Navigation Native Stack v7 (`@react-navigation/native-stack`)
- **Styling & Design System:** Vanilla React Native `StyleSheet` with curated dark navy palette tokens (`#0B1220`, `#172033`, `#22C55E`, `#F97316`)
- **State & Data Management:** React Hooks (`useState`, `useEffect`) with pure local mock state computations.

---

## 🏗️ Directory Architecture

```text
e:/Projects/arklab/
├── App.tsx                        # Root entry point wrapping SafeAreaProvider & AppNavigator
├── index.ts                       # Expo registerRootComponent entry point
├── package.json                   # Project dependencies and Expo scripts
├── task.md                        # Task checklist & specification brief
├── README.md                      # Complete project documentation
└── src/
    ├── types/
    │   └── trade.ts               # InsiderTrade interface & type definitions
    ├── data/
    │   └── mockTrades.ts          # 10 fictional mock insider trade records
    ├── theme/
    │   └── colors.ts              # Design tokens, slate dark colors, and radius rules
    ├── utils/
    │   └── formatters.ts          # Currency, date, and metrics calculation helpers
    ├── components/
    │   ├── TradeCard.tsx          # Card component for trade feed items
    │   ├── FilterChip.tsx         # Filter toggle chip component
    │   ├── SummaryCard.tsx        # Dynamic metric summary card
    │   ├── SignalBadge.tsx        # Signal strength pill badge
    │   └── MockActivityChart.tsx  # 7-day bar chart visualization
    ├── screens/
    │   ├── HomeScreen.tsx         # Market Pulse dashboard screen
    │   ├── ScreenerScreen.tsx     # Filterable trade screener screen
    │   └── TradeDetailsScreen.tsx # Filing deep-dive screen
    └── navigation/
        └── AppNavigator.tsx       # React Navigation stack navigator
```

---

## ⚡ Local Setup & Run Guide

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- Expo Go App on iOS/Android OR Android Studio / Xcode Emulator

### Installation Steps

1. **Clone / Navigate to Repository Directory:**
   ```bash
   cd e:/Projects/arklab
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start Development Server:**
   ```bash
   npx expo start
   ```

4. **Run on Target Device:**
   - Press `a` to open in Android Emulator.
   - Press `i` to open in iOS Simulator.
   - Press `w` to launch in Web browser.
   - Scan the displayed QR code using the **Expo Go** mobile app.

---

## 🎨 Mobile Design Decisions & Accessibility

- **Dark Mode Shell:** Deep dark navy aesthetic (`#0B1220`) reduces eye fatigue while giving metrics high visual prominence.
- **Card Radius & Spacing:** Uniform 16px corner radius with 8-point layout rhythms for a polished native look and feel.
- **High Contrast Identifiers:** Purchases highlighted in emerald green (`#22C55E`), sales in vibrant orange/red (`#F97316`), and signals in violet (`#8B5CF6`).
- **Touch Target Sizing:** Interactive buttons and chips maintain a minimum height/width of 44x44 points for reliable mobile finger taps.
- **Accessibility Labels:** All interactive components include explicit `accessibilityRole` and `accessibilityLabel` attributes for screen readers.

---

## ⚠️ Known Limitations

- **Fictional Data Only:** The app operates exclusively on local mock data and does not connect to SEC EDGAR or live market data feeds.
- **Static Chart Visualization:** The 7-day activity chart renders a clean bar height distribution for demonstration purposes without pinch-to-zoom capabilities.

---

## 🤖 AI-Use Disclosure

This prototype was developed with the assistance of Google Antigravity AI agentic pair programming tools to design layout structures, build reusable React Native components, enforce TypeScript types, and format project deliverables according to the Batch 04 ARKLAB AI specification brief.

---

## 📬 Deliverables & Participation Contact

- **GitHub Repository:** https://github.com/abdullahazmir/arklab-task
- **Live Vercel Web Deployment:** https://arklab-omega.vercel.app
- **Submission Recipient:** `ahmedsakeeb.work@gmail.com`
- **CC:** `hrd@arklabai.com`
- **Subject Line:** `React Native Developer Intern Batch 04 - {Your Name} - Arklab AI`
