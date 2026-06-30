# Property Calc

Rebuild of [realestatecalculators.com.au](https://realestatecalculators.com.au) — an Australian property investment calculator suite. SEO is a primary concern on this project (see SEO section below).

---

## Stack

- **Framework:** Next.js 14 (App Router) — note: the scraped spec references Vite+React Router, but this project uses Next.js
- **Styling:** Tailwind CSS with custom dark theme (CSS variables)
- **Font:** DM Sans via `next/font/google`
- **Icons:** Lucide React
- **Charts:** Recharts (offset calculator)
- **Content:** MDX via next-mdx-remote (blog)
- **SEO:** next-seo (per-page metadata) + next-sitemap (sitemap generation)
- **Booking:** Calendly inline embed
- **Language:** TypeScript

## Dev

```bash
npm run dev      # starts on :3000 (or next available port)
npm run build    # production build
npm run lint     # ESLint
```

## File Structure

```
app/
  layout.tsx                    # Root layout — Navbar + Footer + font
  page.tsx                      # Home (/)
  stamp-duty-calculator/page.tsx
  borrowing-calculator/page.tsx
  rental-yield-calculator/page.tsx
  cashflow-calculator/page.tsx
  lmi-estimator/page.tsx
  offset-account-calculator/page.tsx
  cgt-calculator/page.tsx
  depreciation-calculator/page.tsx
  land-tax-calculator/page.tsx
  deal-scorer/page.tsx
  blog/page.tsx
  about/page.tsx
  contact/page.tsx
  book-a-call/page.tsx
components/
  Navbar.tsx
  Footer.tsx
  CalculatorCard.tsx
lib/
  calculators/
    stampDuty.ts      # all 8 state rate tables
    landTax.ts        # all 8 state rate tables
    lmi.ts
    offset.ts
    cgt.ts
    depreciation.ts
```

---

## Design System

All colors use HSL CSS variables defined in `globals.css`:

```css
:root {
  --background: 225 50% 8%;        /* Deep navy #0d1526 */
  --foreground: 210 40% 96%;
  --card: 225 40% 12%;
  --card-foreground: 210 40% 96%;
  --border: 225 30% 20%;
  --input: 225 30% 16%;
  --muted: 225 30% 16%;
  --muted-foreground: 215 20% 70%;
  --accent: 41 61% 55%;            /* Gold/amber #c9963f */
  --gold: 41 61% 55%;
  --accent-foreground: 225 50% 8%;
  --primary: 225 50% 8%;
  --primary-foreground: 210 40% 96%;
  --secondary: 225 30% 16%;
  --secondary-foreground: 210 40% 96%;
  --destructive: 0 84% 60%;
  --ring: 41 61% 55%;
  --radius: 0.5rem;
}
```

**Design principles:**
- Dark navy background throughout (never white/light)
- Cards are slightly lighter than background with subtle border
- Gold/amber (`hsl(41,61%,55%)`) for accent text, highlighted values, CTA buttons, icons
- Blue is only used for the "Calculate" button on the Rental Yield page
- Font: DM Sans, loaded via `next/font/google`
- `border-radius: 0.5rem` on cards and inputs
- Inputs: dark background (`--input`), white text, ALL-CAPS labels in small muted style
- Mobile-first single-column layout, max content width ~700px centered on desktop

---

## SEO — Primary Concern

SEO is not an afterthought on this project.

- One `<h1>` per page — all page headers are `<h1>`
- All pages use next-seo for `<title>` and `<meta description>`
- Prefer SSG — all calculator pages are static (no server-side data fetching needed)
- All images need descriptive `alt` text
- URL slugs are keyword-relevant (e.g. `/stamp-duty-calculator`)
- All routes must be included in the sitemap (next-sitemap config)
- Never render indexable content client-side only — calculator results can be client-side but page content/headings must be server-rendered

---

## Global Components

### Navbar
- Fixed top, full width, dark navy + bottom border
- Left: calculator/grid icon + "Property Calc" (white bold) → links to `/`
- Right desktop: nav links — "Calculators" (dropdown of all 10), "Blog", "About", "Contact Us", "Book a Call" (gold outlined button)
- Right mobile: hamburger menu

### Footer
- Top: email newsletter signup — "Get property investment tips delivered to your inbox" + email input + "Subscribe" (gold)
- Bottom left: logo + tagline "Every number you need before you buy"
- Bottom right two columns:
  - Quick Links: CGT Calculator, Cash Flow Calculator, Stamp Duty Calculator, Blog, About, Contact Us
  - Legal: Privacy Policy, Terms of Service
- Bottom bar: "© 2026 Property Calc. All rights reserved."

---

## Pages & Routes

### `/` — Home
- Hero: full-viewport, dark candlestick chart background (low opacity), centered H1 + subtitle
  - H1: "Australian Property Calculators & Mortgage Tools for Investors & Buyers"
  - Subtitle: "Free Australian property investment calculators. Make smarter decisions with instant tax, cash flow, and deal analysis."
- Calculator grid: 10 cards (vertical list), each with icon + name + description + link
- "Why use Property Calc" section: 3 feature blocks with gold icons

**10 calculator cards:**
| Name | Route | Description |
|---|---|---|
| Stamp Duty Calculator | `/stamp-duty-calculator` | Calculate stamp duty and upfront costs by state |
| Borrowing Calculator | `/borrowing-calculator` | Estimate your borrowing capacity for investment property |
| Rental Yield Calculator | `/rental-yield-calculator` | Calculate gross and net rental yield on your investment |
| Cash Flow Calculator | `/cashflow-calculator` | Analyze rental income, expenses, and net cash flow |
| LMI Estimator | `/lmi-estimator` | Estimate your Lender's Mortgage Insurance premium |
| Offset Account Calculator | `/offset-account-calculator` | See how much interest and time you can save with an offset account |
| CGT Calculator | `/cgt-calculator` | Calculate capital gains tax on your investment property sale |
| Depreciation Calculator | `/depreciation-calculator` | Estimate tax deductions from property depreciation |
| Land Tax Calculator | `/land-tax-calculator` | Calculate your annual state land tax liability |
| Deal Scorer | `/deal-scorer` | Score and compare investment property deals |

---

### `/stamp-duty-calculator`
- H1: "Australian Stamp Duty Calculator"
- Fields: Buyer Type (dropdown), State (dropdown), Property Type (dropdown), Purchase Price, Loan Amount, Savings (optional)
- Results: Government Costs table (stamp duty, registration fees), Conveyancing & Other Costs (editable: conveyancing $1500, bank fees $800, other $0), Total Upfront Costs card (gold border, large gold amount)
- FAQ accordion: What is stamp duty / First home buyer concessions / Foreign buyer surcharges
- **Logic (NSW default):** Progressive rates — $0-16k: 1.25%, $16k-35k: $200+1.5%, $35k-93k: $485+1.75%, $93k-351k: $1,500+3.5%, $351k-$1.107m: $10,530+4.5%, >$1.107m: $44,550+5.5%. Registration fees $176 each. All 8 states implemented in `lib/calculators/stampDuty.ts`.

### `/borrowing-calculator`
- H1: "Borrowing Calculator"
- Sections: About me (loan purpose, children, adults), My income (salary, partner, rental, other), Expenses (bills, home loan repayments, other loans, credit card limit)
- Results: Income Summary table, Expenses Summary table, Net Income → Estimated Borrowing Capacity (large gold)
- **Logic:** Borrowing capacity ≈ 6-8× net annual income (after expenses)

### `/rental-yield-calculator`
- H1: "Rental Yield Calculator"
- Fields: Property Price, Rent + frequency (weekly/monthly/annual), Vacancy Rate, Annual Expenses
- **Calculate button is blue (not gold)** — only exception on the site
- Results: Gross Yield %, Net Yield %
- **Logic:** Gross Yield = (Annual Rent / Price) × 100; Net Yield = ((Effective Rent - Expenses) / Price) × 100

### `/cashflow-calculator`
- H1: "Cash Flow Calculator"
- Sections: Property & Loan (price, LVR slider, P&I vs IO toggle, rate, term), Income & Expenses (weekly rent, rates, body corp, maintenance), Growth Projections (appreciation slider, investment period)
- Results: cash flow breakdown, yield, projections

### `/lmi-estimator`
- H1: "LMI Estimator"
- Fields: Purchase Price, Deposit, Loan Purpose, Borrower Type
- Results shown only when LVR > 80%: LVR status banner, LMI details table, Estimated LMI Premium (large gold)
- **Logic:** LVR ≤80%: no LMI; 80-85%: 1.20%; 85-90%: 1.80%; 90-95%: 3.20%. Premium = Loan × Rate.

### `/offset-account-calculator`
- H1: "Offset Account Savings"
- Fields: Loan Amount, Rate, Term, Offset Balance (gold label)
- Results: Interest Saved + Time Saved (two large gold stat cards), line chart (Recharts) showing loan balance over time with vs without offset, comparison tables
- **Logic:** Standard amortization vs effective loan = Loan - Offset. Same monthly payment, shorter payoff.

### `/cgt-calculator`
- H1: "Capital Gains Tax Calculator"
- Fields: Asset Type, New Build toggle, Purchase Price, Date of Purchase, Sale Price, Date of Sale, Capital Improvements, Taxable Income, CPI/Inflation slider
- Results: CGT liability, 50% discount if held >12 months, indexed cost base, net capital gain

### `/depreciation-calculator`
- H1: "Depreciation Calculator"
- Fields: Property Type, Year Built, Purchase Price, State
- Results: Division 43 (2.5%/yr of construction cost), Division 40 (plant & equipment), 5-year depreciation schedule table

### `/land-tax-calculator`
- H1: "Land Tax Calculator"
- Fields: State/Territory (default VIC), Unimproved Land Value, Owner Entity Type, Absentee Owner toggle
- Results: State, assessed value, threshold, marginal rate, Estimated Annual Bill (large gold)
- **VIC logic (default):** threshold $50k; $50k-100k: $500 flat; $100k-300k: $975+0.2%; $300k-600k: $1,375+0.5%; $600k-$1m: $2,875+0.8%; >$1m: $6,075+1.3%. All 8 states in `lib/calculators/landTax.ts`.

### `/deal-scorer`
- H1: "Deal Scorer"
- Accordion sections: Basic Inputs (price/deposit/rate/term sliders), Rental Income, Buying Costs, Annual Expenses, Growth Projections, Tax Settings, Loan Options, Personal Affordability
- Results (always visible): Overall Deal Score /100 (large), Buy/Hold/Pass rating, tabs: Summary | Breakdown | 10-Yr Projection | Pros & Cons
- Monthly cash flow bar chart (Recharts)
- **Scoring:** Gross yield + cash flow + LVR + capital growth + affordability → weighted average /100 → Buy ≥80, Hold 50-79, Pass <50

### `/blog`
- H1: "Property Investment Insights"
- Article cards: date, author ("Curtis Surge Real Estate"), title (H2), description, "Read full article →" (gold)
- MDX content via next-mdx-remote

### `/about`
- H1: "About Property Calc"
- Cards: Who I am, Services offered (bulleted), Book a call (Calendly embed)

### `/contact`
- H1: "Get in touch"
- "Prefer to chat?" banner with Book a Call button (gold)
- Contact form: Full Name, Email, Phone, Message, Send Message (gold)

### `/book-a-call`
- H1: "Book Your **Free Initial** Property Strategy Session" ("Free Initial" in gold)
- Calendly inline embed for Curtis Moore — 30-minute meeting

---

## Implementation Notes

- **All calculators are real-time** — results update on input change. No submit button except Rental Yield.
- **Currency formatting:** `$34,225` — commas, dollar prefix, no decimals for whole numbers
- **Mobile-first:** single column, cards stack vertically, max-width ~700px centered on desktop
- **Client components:** Calculator pages use `'use client'` for interactivity. Page shell (H1, description) is server-rendered for SEO.
- **Tailwind config:** Extend theme with CSS variable colors — `bg-background`, `text-foreground`, `text-accent`, `border-border`, etc.
- **Build order:** Navbar + Footer + Home (design system) → calculators one at a time → blog/about/contact

## Git Workflow

- Feature branches → PR → merge to `master`
- `master` is protected (no direct pushes)
- Branches auto-delete after merge
- PRs created via `gh pr create`
