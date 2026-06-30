# Calculator rate review (pre-launch)

The calculator logic was ported faithfully from the live site
(realestatecalculators.com.au). **All rates are estimates** and several are
simplified or out of date. This document flags what to validate against
official sources before a public launch. Nothing here is a code change — it's a
checklist with file pointers and recommended fixes.

Severity: 🔴 wrong / misleading · 🟠 simplified / incomplete · 🟡 verify

_Last reviewed: June 2026._

---

## 🔴 CGT — income tax brackets are out of date
**File:** [lib/calculators/cgt.ts](../lib/calculators/cgt.ts) — `marginalRate()`

Current code uses the pre-2024 ("stage 3") brackets:

| Code (now) | Current ATO 2024–25 / 2025–26 |
|---|---|
| ≤45,000 → 19% | 18,201–45,000 → **16%** |
| ≤120,000 → 32.5% | 45,001–135,000 → **30%** |
| <180,000 → 37% | 135,001–190,000 → **37%** |
| else → 45% | 190,001+ → **45%** |

The thresholds (120k/180k) and rates (19%, 32.5%) are wrong. Update to
18,200 / 45,000 / 135,000 / 190,000 at 0 / 16 / 30 / 37 / 45%. (Excludes the 2%
Medicare levy, which the calculator also ignores — fine to note in the UI.)

## 🔴 CGT — 50% discount is tied to "new build" instead of the 12‑month rule
**File:** [lib/calculators/cgt.ts](../lib/calculators/cgt.ts) — `isEligibleForDiscount`

The 50% CGT discount applies to assets held **12 months or more** by a resident
individual. The ported logic instead grants it only when
`assetType === 'Residential Property' && isNewBuild`, which is incorrect. It
should be derived from the purchase/sale dates (>365 days held) — those inputs
already exist. The "new build" toggle is not an ATO concept here.

## 🟠 Stamp duty — only NSW & VIC are real; other states use a flat 4.5%
**File:** [lib/calculators/stampDuty.ts](../lib/calculators/stampDuty.ts)

QLD, SA, WA, TAS, ACT and NT fall back to `purchasePrice * 0.045`. These need
real progressive tables from each state revenue office. NSW and VIC tables
(and the FHB exemption thresholds — NSW ≤$800k, VIC ≤$600k) should be
re-confirmed against current Revenue NSW / SRO Victoria schedules; FHB schemes
also have concessional **taper bands** above the exemption that aren't modelled
(currently exemption-or-nothing).

## 🟠 Land tax — all states present but estimated; VIC has a discontinuity
**File:** [lib/calculators/landTax.ts](../lib/calculators/landTax.ts)

Thresholds/rates for all 8 jurisdictions should be verified against each state
revenue office. Note a likely ported bug in the **VIC** $300k–$600k band: it
restarts at base `135` instead of accumulating from the prior band (~`635`), so
it under-charges by ~$500 across that band. Absentee/foreign and company/trust
surcharges are approximations.

## 🟠 LMI — single indicative rate table
**File:** [lib/calculators/lmi.ts](../lib/calculators/lmi.ts)

Real LMI premiums vary by **lender, insurer (e.g. Helia, QBE), loan size and
LVR** and don't follow one clean table. The bands (1.2 / 2.2 / 3.5 / 4.5% with
×1.15 investment, ×0.9 FHB) are a rough estimate — label as indicative.

## 🟠 Depreciation — heuristic, not a true Div 40/43 schedule
**File:** [lib/calculators/depreciation.ts](../lib/calculators/depreciation.ts)

Uses an age-tapered combined rate, not a real quantity-surveyor schedule. Note:
since 2017, **second-hand plant & equipment (Div 40)** is generally **not**
deductible for established residential properties — only Div 43 capital works
applies. Worth caveating prominently.

## 🟡 Borrowing — 6× net income is a rough proxy
**File:** [lib/calculators/borrowing.ts](../lib/calculators/borrowing.ts)

Real serviceability uses interest-rate buffers (APRA ~3%), HEM living expenses,
and debt-to-income limits. The 6× multiple is a ballpark; the UI already says
"typically 6–8×", which is reasonable for a guide.

---

## Suggested order to fix
1. CGT brackets + 12‑month discount (clear, authoritative, small change).
2. VIC land-tax band discontinuity.
3. Decide on stamp duty: implement the remaining state tables, or clearly label
   non‑NSW/VIC as "estimate only".
4. Add prominent "estimates only — confirm with a professional" disclaimers on
   each calculator (the legal pages already carry the general disclaimer).

## Sources
- [ATO — Tax rates, Australian residents](https://www.ato.gov.au/tax-rates-and-codes/tax-rates-australian-residents)
- [ATO — CGT discount](https://www.ato.gov.au/individuals-and-families/investments-and-assets/capital-gains-tax/cgt-discount)
- State revenue offices: Revenue NSW, SRO Victoria, QRO Queensland, RevenueSA, RevenueWA, SRO Tasmania, ACT Revenue, Territory Revenue Office (NT).
