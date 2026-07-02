'use client'

import { useMemo, useState } from 'react'
import { Calculator, CreditCard } from 'lucide-react'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { Card, CardHeader, CardBody, CardLabel, ResultRow } from '@/components/ui/Card'
import { CalcGrid, CalcInputs, CalcResults } from '@/components/calculators/CalcLayout'
import Ticker from '@/components/ui/Ticker'
import { calculateBorrowing, type Frequency, type LoanPurpose } from '@/lib/calculators/borrowing'
import { formatCurrency } from '@/lib/utils'

const FREQ_OPTIONS = [
  { value: 'Per month', label: 'Per month' },
  { value: 'Per year', label: 'Per year' },
]

const LOAN_PURPOSE_OPTIONS = [
  { value: 'owner-occupied', label: 'A home to live in' },
  { value: 'investment', label: 'An investment property' },
]

const CHILDREN_OPTIONS = [
  { value: '0', label: '0' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6+' },
]

export default function BorrowingCalculator() {
  const [loanPurpose, setLoanPurpose] = useState<LoanPurpose>('owner-occupied')
  const [numberOfChildren, setNumberOfChildren] = useState('0')
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
  const [creditCardLimit, setCreditCardLimit] = useState('0')

  const num = (v: string) => {
    const n = parseFloat(v.replace(/[^0-9.-]+/g, ''))
    return Number.isFinite(n) ? n : 0
  }

  const r = useMemo(
    () =>
      calculateBorrowing({
        loanPurpose,
        numberOfChildren: num(numberOfChildren),
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
        creditCardLimit: num(creditCardLimit),
      }),
    [loanPurpose, numberOfChildren, annualSalary, partnerSalary, monthlyRentalIncome, otherAnnualIncome, bills, billsFrequency, homeLoanRepayments, homeLoanFrequency, otherLoanRepayments, otherLoanFrequency, creditCardLimit],
  )

  return (
    <CalcGrid>
      <CalcInputs>

        <Card>
          <CardHeader>
            <Calculator className="h-5 w-5 text-accent" />
            <CardLabel>About This Loan</CardLabel>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="This loan is for"
                options={LOAN_PURPOSE_OPTIONS}
                value={loanPurpose}
                onChange={(e) => setLoanPurpose(e.target.value as LoanPurpose)}
              />
              <Select
                label="Children under 18"
                options={CHILDREN_OPTIONS}
                value={numberOfChildren}
                onChange={(e) => setNumberOfChildren(e.target.value)}
              />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
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
            <CreditCard className="h-5 w-5 text-accent" />
            <CardLabel>Credit</CardLabel>
          </CardHeader>
          <CardBody>
            <Input
              label="Total Credit Card Limit"
              type="number"
              inputMode="decimal"
              prefix="$"
              value={creditCardLimit}
              onChange={(e) => setCreditCardLimit(e.target.value)}
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Lenders assess 3% of your total credit card limit as a monthly commitment, regardless of your current balance.
            </p>
          </CardBody>
        </Card>

      </CalcInputs>

      <CalcResults>
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
                <Ticker value={r.borrowingCapacity} format={formatCurrency} />
              </p>
              <p className="text-xs text-muted-foreground mt-3">
                {loanPurpose === 'investment'
                  ? 'Based on standard investment lending criteria: typically 5.5x net annual income.'
                  : 'Based on standard owner-occupier lending criteria: typically 6x net annual income.'}
              </p>
            </div>
          </CardBody>
        </Card>
      </CalcResults>
    </CalcGrid>
  )
}
