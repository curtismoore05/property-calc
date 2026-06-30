'use client'

import { useMemo, useState } from 'react'
import { BarChart3 } from 'lucide-react'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { Card, CardHeader, CardBody, CardLabel, ResultRow } from '@/components/ui/Card'
import { calculatePropertyDeal, DEAL_DEFAULTS } from '@/lib/calculators/propertyDeal'
import { formatCurrency, formatPercent } from '@/lib/utils'

export default function CashFlowCalculator() {
  const [f, setF] = useState({
    purchasePrice: '800000',
    downPayment: '160000',
    interestRate: '6.5',
    loanTerm: '30',
    interestOnly: false,
    rentPerWeek: '600',
    vacancyRate: '2',
    managementFee: '7',
    insurance: '1500',
    councilRates: '2000',
    waterRates: '1000',
    maintenance: '2000',
    strata: '0',
    marginalTaxRate: '37',
    negativeGearing: true,
  })
  const set = (k: keyof typeof f, v: string | boolean) => setF((p) => ({ ...p, [k]: v }))
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
        interestOnly: f.interestOnly,
        rentPerWeek: num(f.rentPerWeek),
        vacancyRate: num(f.vacancyRate),
        managementFee: num(f.managementFee),
        insurance: num(f.insurance),
        councilRates: num(f.councilRates),
        waterRates: num(f.waterRates),
        maintenance: num(f.maintenance),
        strata: num(f.strata),
        marginalTaxRate: num(f.marginalTaxRate),
        negativeGearing: f.negativeGearing,
      }),
    [f],
  )

  const weekly = (annual: number) => annual / 52

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <BarChart3 className="h-5 w-5 text-accent" />
          <CardLabel>Property &amp; Loan</CardLabel>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Purchase Price" type="number" inputMode="decimal" prefix="$" value={f.purchasePrice} onChange={(e) => set('purchasePrice', e.target.value)} />
            <Input label="Deposit" type="number" inputMode="decimal" prefix="$" value={f.downPayment} onChange={(e) => set('downPayment', e.target.value)} />
            <Input label="Interest Rate" type="number" inputMode="decimal" suffix="%" value={f.interestRate} onChange={(e) => set('interestRate', e.target.value)} />
            <Input label="Loan Term" type="number" inputMode="decimal" suffix="yrs" value={f.loanTerm} onChange={(e) => set('loanTerm', e.target.value)} />
          </div>
          <label className="flex items-center gap-3 text-sm text-foreground">
            <input type="checkbox" checked={f.interestOnly} onChange={(e) => set('interestOnly', e.target.checked)} className="h-4 w-4 accent-[hsl(var(--accent))]" />
            Interest-only loan
          </label>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardLabel>Income &amp; Expenses</CardLabel>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Rent (per week)" type="number" inputMode="decimal" prefix="$" value={f.rentPerWeek} onChange={(e) => set('rentPerWeek', e.target.value)} />
            <Input label="Vacancy Rate" type="number" inputMode="decimal" suffix="%" value={f.vacancyRate} onChange={(e) => set('vacancyRate', e.target.value)} />
            <Input label="Management Fee" type="number" inputMode="decimal" suffix="%" value={f.managementFee} onChange={(e) => set('managementFee', e.target.value)} />
            <Input label="Insurance (annual)" type="number" inputMode="decimal" prefix="$" value={f.insurance} onChange={(e) => set('insurance', e.target.value)} />
            <Input label="Council Rates (annual)" type="number" inputMode="decimal" prefix="$" value={f.councilRates} onChange={(e) => set('councilRates', e.target.value)} />
            <Input label="Water Rates (annual)" type="number" inputMode="decimal" prefix="$" value={f.waterRates} onChange={(e) => set('waterRates', e.target.value)} />
            <Input label="Maintenance (annual)" type="number" inputMode="decimal" prefix="$" value={f.maintenance} onChange={(e) => set('maintenance', e.target.value)} />
            <Input label="Strata (annual)" type="number" inputMode="decimal" prefix="$" value={f.strata} onChange={(e) => set('strata', e.target.value)} />
            <Input label="Marginal Tax Rate" type="number" inputMode="decimal" suffix="%" value={f.marginalTaxRate} onChange={(e) => set('marginalTaxRate', e.target.value)} />
          </div>
          <label className="flex items-center gap-3 text-sm text-foreground">
            <input type="checkbox" checked={f.negativeGearing} onChange={(e) => set('negativeGearing', e.target.checked)} className="h-4 w-4 accent-[hsl(var(--accent))]" />
            Apply negative gearing tax benefit
          </label>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardLabel>Cash Flow</CardLabel>
        </CardHeader>
        <CardBody className="space-y-0">
          <ResultRow label="Gross yield" value={formatPercent(r.grossYield * 100, 2)} />
          <ResultRow label="Effective annual rent" value={formatCurrency(r.effectiveRent)} />
          <ResultRow label="Total annual costs" value={formatCurrency(r.totalAnnualCosts)} />
          <ResultRow label="Annual loan repayments" value={formatCurrency(r.annualRepayment)} />
          <ResultRow label="Pre-tax cash flow (annual)" value={formatCurrency(r.preTaxCashFlow)} />
          <ResultRow label="Tax benefit" value={formatCurrency(r.taxBenefit)} />
          <ResultRow label="After-tax cash flow (weekly)" value={formatCurrency(weekly(r.afterTaxCashFlow))} />
        </CardBody>
      </Card>

      <Card gold>
        <CardBody>
          <div className="text-center">
            <CardLabel>After-Tax Cash Flow (annual)</CardLabel>
            <p className={`monospace-numbers text-4xl sm:text-5xl font-extrabold mt-2 ${r.afterTaxCashFlow >= 0 ? 'text-accent' : 'text-destructive'}`}>
              {formatCurrency(r.afterTaxCashFlow)}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {r.afterTaxCashFlow >= 0 ? 'Positively geared' : 'Negatively geared — requires holding power'}
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
