# FUTUREIX Digital Services Platform

> **Build. Scale. Dominate.**  
> Positioning: AI, Marketing & Technology  
> Official Website: [https://futureix.in](https://futureix.in)  
> Founders: **Kartik Garhwal** (Founder) | **Mritunjay Pratap Singh** (Co-founder)  
> Primary Market: India | Currency: INR (₹) | Languages: English & हिन्दी (Bilingual)

---

## 1. Executive Overview

The **FUTUREIX Digital Services Platform** is a dual-experience enterprise web system built for high performance, commercial clarity, and operational scale:

1. **Public Client Experience**: A luxury digital agency presence inspired by Apple, Stripe, and Linear design principles, showcasing all 14 service disciplines, transparent indicative price ranges, package tiers, verified case studies, and lead capture.
2. **Private Internal Workspace (`/internal/*`)**: A secure estimation suite for Futureix team members featuring a feature-based interactive pricing calculator, live quote generation, multi-role authorization, price catalogue management, CRM inquiries pipeline, and bilingual PDF proposal export.

---

## 2. Key Architecture & Technology Stack

- **Framework**: Next.js 15 (App Router) with TypeScript & React 19
- **Styling**: Tailwind CSS with custom brand design tokens (`#0A2345` Deep Navy, `#4776FF` Electric Blue, `#D89A1E` Royal Gold)
- **Typography**: Space Grotesk (Headings) & Inter (Body)
- **Bilingual Engine**: Complete dictionary-based language switcher (`English` & `हिन्दी`) with persistent preferences
- **Database & Migration**: PostgreSQL 15+ & Supabase schema with Row Level Security (RLS) policies (`supabase/migrations/20261013000000_init_futureix_schema.sql`)
- **Validation**: Zod schema validation across API endpoints
- **Testing**: Built-in test runner with 100% pass rate across commercial calculations and permission matrices

---

## 3. Public Website Structure

| Page Route | Purpose & Key Features |
| :--- | :--- |
| `/` | Homepage with hero section, verified metrics, 6 core service disciplines, process workflow, industry cards, package highlights, and consultation form. |
| `/services` | Directory of all 12+ digital capabilities with category filtering (Tech, Performance Marketing, Automations) and transparent starting prices. |
| `/services/[slug]` | Dedicated service pages (e.g. `/services/website-development`, `/services/mobile-app-development`, etc.) with typical ranges, scope inclusions, exclusions, and custom CTAs. |
| `/pricing` | Pre-engineered package bundles (Business Starter, Growth Website, E-commerce Launch, Mobile App MVP, Growth Retainer, Performance Marketing, AI Automation). |
| `/portfolio` | Verified case studies detailing actual scope, tech stack, and authentic operational outcomes. |
| `/about` | Company background, leadership profiles (Kartik Garhwal & Mritunjay Pratap Singh), and core engineering values. |
| `/contact` | Working consultation inquiry form with validation, reference generator (`FIX-ENQ-XXXX`), and direct WhatsApp link. |
| `/faqs` | Comprehensive bilingual accordion addressing pricing, ad spend separation, source code ownership, and timelines. |
| `/privacy` | Privacy policy compliant with Indian digital data norms. |
| `/terms` | Commercial terms, milestone payment policies, and cancellation/refund terms. |

---

## 4. Feature-Based Pricing Calculator (`/internal/pricing-calculator`)

The calculation engine (`src/lib/calculatorEngine.ts`) implements strict commercial rules:

- **Base + Add-ons**: Base package cost + additional custom page/screen increments + modular feature add-ons.
- **Inclusion Rules**: Features already included in base packages (e.g. payment gateway in e-commerce) add ₹0 incremental cost to prevent double-charging.
- **Platform Multipliers**:
  - Android or iOS Native: 1.0x
  - Shared Cross-Platform Codebase: 1.35x
  - Separate Native Android + iOS: 1.9x
  - Progressive Web App (PWA): 0.75x
- **Pass-through Separation**: Monthly direct advertising spend paid to Meta/Google is strictly segregated from agency service revenue.
- **GST Calculation**: Configurable 18% GST toggle with automated tax breakdown.
- **Technical Discovery Detection**: Automatically triggers discovery advisory warnings when scope complexity exceeds standard parameters.
- **PDF Proposal Modal**: Produces bilingual (`EN` / `HI`), print-ready official quotations with quotation number, milestone schedule (50% advance / 50% launch), scope policy, and client acceptance boxes.

---

## 5. Internal Workspace Routes & Permissions

| Route | Functionality |
| :--- | :--- |
| `/internal/login` | Role-based authentication with quick-switch presets for evaluation. |
| `/internal/dashboard` | Real-time analytics computed directly from stored quotes and inquiries (Pipeline value, status breakdown, recent activity). |
| `/internal/pricing-calculator` | 4-step interactive estimator and proposal generation suite. |
| `/internal/price-catalogue` | Master price catalogue management (Admin has write access; Sales and Viewer are read-only). |
| `/internal/quotes` | Saved quote snapshots, status tracking (`draft`, `sent`, `approved`, `rejected`), and PDF exports. |
| `/internal/customers` | Inbound lead management with one-click conversion to estimate and direct WhatsApp outreach. |
| `/internal/settings` | GST rate configuration, GSTIN, WhatsApp business number, agency address, and discount thresholds. |

### Role Permissions Matrix

| Capability | Administrator | Sales / Estimator | Viewer |
| :--- | :---: | :---: | :---: |
| Access Pricing Calculator | Yes | Yes | Read-only |
| Create & Save Quotations | Yes | Yes | No |
| Maximum Authorized Discount | Up to 50% | Up to 15% | 0% |
| Modify Master Price Catalogue | Yes | No | No |
| Modify Workspace Settings & Tax | Yes | No | No |

---

## 6. Automated Unit Tests

Run the test suite using `npm test`:

```bash
npm test
```

### Tested Test Cases:
1. `Calculator computes basic web project range accurately`
2. `Calculator separates direct ad spend from agency revenue`
3. `Mobile app cross-platform multiplier applies correctly`
4. `Technical discovery flag is triggered for high-complexity enterprise scope`
5. `Admin has full rights including catalogue editing and high discounts`
6. `Sales role cannot edit catalogue and cannot exceed 15% discount`
7. `Viewer role has read-only access and cannot create quotes or apply discounts`

---

## 7. External Integrations & Production Checklist

The application is structured to connect to external services via environment variables (`.env.local`):

| Integration | Required Environment Variables | Description |
| :--- | :--- | :--- |
| **Meta WhatsApp Cloud API** | `WHATSAPP_API_TOKEN`, `WHATSAPP_PHONE_ID` | Direct API broadcast and automated chat webhooks. |
| **Meta Conversions API (CAPI)** | `META_PIXEL_ID`, `META_CAPI_ACCESS_TOKEN` | Server-side conversion event attribution. |
| **Google Analytics 4 & GTM** | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Web traffic and conversion measurement. |
| **Supabase / PostgreSQL** | `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Remote database storage with RLS policies. |
| **Razorpay Payments** | `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` | Advance milestone payment links. |

---

## 8. Development & Production Deployment

### Development:
```bash
npm install
npm run dev
```

### Production Build:
```bash
npm run build
npm run start
```
Server runs on `http://localhost:3000`.
