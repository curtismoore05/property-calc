'use client'

import { useMemo, useState } from 'react'
import { Star } from 'lucide-react'
import Input from '@/components/ui/Input'
import { Card, CardHeader, CardBody, CardLabel, ResultRow } from '@/components/ui/Card'
import { calculatePropertyDeal, DEAL_DEFAULTS } from '@/lib/calculators/propertyDeal'
import { CalcGrid, CalcInputs, CalcResults } from '@/components/calculators/CalcLayout'
import { formatCurrency, formatPercent } from '@/lib/utils'

const RATING_COLOR: Record<string, string> = {
  'Strong Buy': 'text-green-500',
  Buy: 'text-green-500',
  Hold: 'text-accent',
  Avoid: 'text-destructive',
}

export default function DealScorer() {
  const [f, setF] = useState({
    purchasePrice: '800000',
    downPayment: '160000',
    interestRate: '6.5',
    loanTerm: '30',
    rentPerWeek: '600',
    expectedGrowth: '4',
    vacancyRate: '2',
    managementFee: '7',
    insurance: '1500',
    councilRates: '2000',
    waterRates: '1000',
    maintenance: '2000',
    strata: '0',
    monthlySalary: '12000',
    livingExpenses: '4000',
    desiredBuffer: '1000',
  })
  const set = (k: keyof typeof f, v: string) => setF((p) => ({ ...p, [k]: v }))
  const num = (v: string) => {
    const n = parseFloat(v.replace(/[^0-9.-]+/g, ''))
    return Number.isFinite(n) ? n : 0
  }

  const r = useMemo(
    () =>
      calculatePropertyDeal({
        ...DEAL_DEFAULTS,
        purchasePrice: num(f.purchasePrice),
        downPayment: num(f.downPayment),
        interestRate: num(f.interestRate),
        loanTerm: num(f.loanTerm),
        rentPerWeek: num(f.rentPerWeek),
        expectedGrowth: num(f.expectedGrowth),
        vacancyRate: num(f.vacancyRate),
        managementFee: num(f.managementFee),
        insurance: num(f.insurance),
        councilRates: num(f.councilRates),
        waterRates: num(f.waterRates),
        maintenance: num(f.maintenance),
        strata: num(f.strata),
        monthlySalary: num(f.monthlySalary),
        livingExpenses: num(f.livingExpenses),
        desiredBuffer: num(f.desiredBuffer),
      }),
    [f],
  )

  const scoreRows: [string, number][] = [
    ['Gross yield', r.yieldScore],
    ['Cash flow', r.cashFlowScore],
    ['Personal buffer', r.bufferScore],
    ['Debt coverage', r.dscrScore],
    ['Capital growth', r.growthScore],
  ]

  return (
    <CalcGrid>
      <CalcInputs>
      <Card>
        <CardHeader>
          <Star className="h-5 w-5 text-accent" />
          <CardLabel>Deal Inputs</CardLabel>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Purchase Price" type="number" inputMode="decimal" prefix="$" value={f.purchasePrice} onChange={(e) => set('purchasePrice', e.target.value)} />
            <Input label="Deposit" type="number" inputMode="decimal" prefix="$" value={f.downPayment} onChange={(e) => set('downPayment', e.target.value)} />
            <Input label="Interest Rate" type="number" inputMode="decimal" suffix="%" value={f.interestRate} onChange={(e) => set('interestRate', e.target.value)} />
            <Input label="Loan Term" type="number" inputMode="decimal" suffix="yrs" value={f.loanTerm} onChange={(e) => set('loanTerm', e.target.value)} />
            <Input label="Rent (per week)" type="number" inputMode="decimal" prefix="$" value={f.rentPerWeek} onChange={(e) => set('rentPerWeek', e.target.value)} />
            <Input label="Expected Growth" type="number" inputMode="decimal" suffix="%" value={f.expectedGrowth} onChange={(e) => set('expectedGrowth', e.target.value)} />
            <Input label="Vacancy Rate" type="number" inputMode="decimal" suffix="%" value={f.vacancyRate} onChange={(e) => set('vacancyRate', e.target.value)} />
            <Input label="Management Fee" type="number" inputMode="decimal" suffix="%" value={f.managementFee} onChange={(e) => set('managementFee', e.target.value)} />
            <Input label="Insurance (annual)" type="number" inputMode="decimal" prefix="$" value={f.insurance} onChange={(e) => set('insurance', e.target.value)} />
            <Input label="Council Rates (annual)" type="number" inputMode="decimal" prefix="$" value={f.councilRates} onChange={(e) => set('councilRates', e.target.value)} />
            <Input label="Water Rates (annual)" type="number" inputMode="decimal" prefix="$" value={f.waterRates} onChange={(e) => set('waterRates', e.target.value)} />
            <Input label="Maintenance (annual)" type="number" inputMode="decimal" prefix="$" value={f.maintenance} onChange={(e) => set('maintenance', e.target.value)} />
            <Input label="Strata (annual)" type="number" inputMode="decimal" prefix="$" value={f.strata} onChange={(e) => set('strata', e.target.value)} />
            <Input label="Monthly Salary" type="number" inputMode="decimal" prefix="$" value={f.monthlySalary} onChange={(e) => set('monthlySalary', e.target.value)} />
            <Input label="Living Expenses (monthly)" type="number" inputMode="decimal" prefix="$" value={f.livingExpenses} onChange={(e) => set('livingExpenses', e.target.value)} />
            <Input label="Desired Buffer (monthly)" type="number" inputMode="decimal" prefix="$" value={f.desiredBuffer} onChange={(e) => set('desiredBuffer', e.target.value)} />
          </div>
        </CardBody>
      </Card>

      </CalcInputs>

      <CalcResults>
      <Card gold>
        <CardBody>
          <div className="text-center">
            <CardLabel>Overall Deal Score</CardLabel>
            <p className="monospace-numbers text-6xl font-extrabold text-accent mt-2">
              {Math.round(r.score)}
              <span className="text-2xl text-muted-foreground">/100</span>
            </p>
            <p className={`text-xl font-bold mt-1 ${RATING_COLOR[r.rating]}`}>{r.rating}</p>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardLabel>Score Breakdown</CardLabel>
        </CardHeader>
        <CardBody className="space-y-0">
          {scoreRows.map(([label, value]) => (
            <ResultRow key={label} label={label} value={`${value.toFixed(1)} / 20`} />
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardLabel>Key Metrics</CardLabel>
        </CardHeader>
        <CardBody className="space-y-0">
          <ResultRow label="Gross yield" value={formatPercent(r.grossYield * 100, 2)} />
          <ResultRow label="LVR" value={formatPercent(r.lvr, 1)} />
          <ResultRow label="After-tax cash flow (weekly)" value={formatCurrency(r.afterTaxCashFlow / 52)} />
          <ResultRow label="Projected 10-year growth" value={formatCurrency(r.tenYearGrowth)} />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardLabel>10-Year Projection</CardLabel>
        </CardHeader>
        <CardBody className="space-y-0">
          {r.projection.map((p) => (
            <ResultRow
              key={p.year}
              label={`Year ${p.year}`}
              value={`${formatCurrency(p.value)} · ${formatCurrency(p.cashFlow)} cf`}
            />
          ))}
        </CardBody>
      </Card>
      </CalcResults>
    </CalcGrid>
  )
}
