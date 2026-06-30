'use client'

import { useMemo, useState } from 'react'
import { Calculator } from 'lucide-react'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { Card, CardHeader, CardBody, CardLabel, ResultRow } from '@/components/ui/Card'
import { calculateBorrowing, type Frequency } from '@/lib/calculators/borrowing'
import { formatCurrency } from '@/lib/utils'

const FREQ_OPTIONS = [
  { value: 'Per month', label: 'Per month' },
  { value: 'Per year', label: 'Per year' },
]

export default function BorrowingCalculator() {
  const [annualSalary, setAnnualSalary] = useState('90000')
  const [partnerSalary, setPartnerSalary] = useState('0')
  const [monthlyRentalIncome, setMonthlyRentalIncome] = useState('0')
  const [otherAnnualIncome, setOtherAnnualIncome] = useState('0')
  const [bills, setBills] = useState('0')
  const [billsFrequency, setBillsFrequency] = useState<Frequency>('Per month')
  const [homeLoanRepayments, setHomeLoanRepayments] = useState('0')
  const [homeLoanFrequency, setHomeLoanFrequency] = useState<Frequency>('Per month')
  const [otherLoanRepayments, setOtherLoanRepayments] = useState('0')
  const [otherLoanFrequency, setOtherLoanFrequency] = useState<Frequency>('Per month')

  const num = (v: string) => {
    const n = parseFloat(v.replace(/[^0-9.-]+/g, ''))
    return Number.isFinite(n) ? n : 0
  }

  const r = useMemo(
    () =>
      calculateBorrowing({
        annualSalary: num(annualSalary),
        partnerSalary: num(partnerSalary),
        monthlyRentalIncome: num(monthlyRentalIncome),
        otherAnnualIncome: num(otherAnnualIncome),
        bills: num(bills),
        billsFrequency,
        homeLoanRepayments: num(homeLoanRepayments),
        homeLoanFrequency,
        otherLoanRepayments: num(otherLoanRepayments),
        otherLoanFrequency,
      }),
    [annualSalary, partnerSalary, monthlyRentalIncome, otherAnnualIncome, bills, billsFrequency, homeLoanRepayments, homeLoanFrequency, otherLoanRepayments, otherLoanFrequency],
  )

  return (
    <div className="space-y-6 animate-children">
      <Card>
        <CardHeader>
          <Calculator className="h-5 w-5 text-accent" />
          <CardLabel>My Income</CardLabel>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Annual Salary" type="number" inputMode="decimal" prefix="$" value={annualSalary} onChange={(e) => setAnnualSalary(e.target.value)} />
            <Input label="Partner's Salary (annual)" type="number" inputMode="decimal" prefix="$" value={partnerSalary} onChange={(e) => setPartnerSalary(e.target.value)} />
            <Input label="Rental Income (per month)" type="number" inputMode="decimal" prefix="$" value={monthlyRentalIncome} onChange={(e) => setMonthlyRentalIncome(e.target.value)} />
            <Input label="Other Income (annual)" type="number" inputMode="decimal" prefix="$" value={otherAnnualIncome} onChange={(e) => setOtherAnnualIncome(e.target.value)} />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardLabel>My Expenses</CardLabel>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 items-end">
            <Input label="Bills &amp; Living Expenses" type="number" inputMode="decimal" prefix="$" value={bills} onChange={(e) => setBills(e.target.value)} />
            <Select label="Frequency" options={FREQ_OPTIONS} value={billsFrequency} onChange={(e) => setBillsFrequency(e.target.value as Frequency)} />
            <Input label="Home Loan Repayments" type="number" inputMode="decimal" prefix="$" value={homeLoanRepayments} onChange={(e) => setHomeLoanRepayments(e.target.value)} />
            <Select label="Frequency" options={FREQ_OPTIONS} value={homeLoanFrequency} onChange={(e) => setHomeLoanFrequency(e.target.value as Frequency)} />
            <Input label="Other Loan Repayments" type="number" inputMode="decimal" prefix="$" value={otherLoanRepayments} onChange={(e) => setOtherLoanRepayments(e.target.value)} />
            <Select label="Frequency" options={FREQ_OPTIONS} value={otherLoanFrequency} onChange={(e) => setOtherLoanFrequency(e.target.value as Frequency)} />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardLabel>Summary</CardLabel>
        </CardHeader>
        <CardBody className="space-y-0">
          <ResultRow label="Total annual income" value={formatCurrency(r.totalIncome)} />
          <ResultRow label="Total annual expenses" value={formatCurrency(r.totalExpenses)} />
          <ResultRow label="Net annual income" value={formatCurrency(r.netIncome)} bold />
          <ResultRow label="Monthly net income" value={formatCurrency(r.monthlyNet)} />
        </CardBody>
      </Card>

      <Card gold>
        <CardBody>
          <div className="text-center">
            <CardLabel>Estimated Borrowing Capacity</CardLabel>
            <p className="monospace-numbers text-4xl sm:text-5xl font-extrabold text-accent mt-2">
              {formatCurrency(r.borrowingCapacity)}
            </p>
            <p className="text-xs text-muted-foreground mt-3">
              Based on standard lending criteria: typically 6–8× net annual income.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
