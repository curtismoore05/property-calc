'use client'

import { useMemo, useState } from 'react'
import { PiggyBank } from 'lucide-react'
import Input from '@/components/ui/Input'
import { Card, CardHeader, CardBody, CardLabel, ResultRow } from '@/components/ui/Card'
import { calculateOffset } from '@/lib/calculators/offsetAccount'
import { formatCurrency } from '@/lib/utils'

export default function OffsetAccountCalculator() {
  const [loanAmount, setLoanAmount] = useState('600000')
  const [interestRate, setInterestRate] = useState('6.5')
  const [loanTerm, setLoanTerm] = useState('30')
  const [offsetBalance, setOffsetBalance] = useState('50000')

  const num = (v: string) => {
    const n = parseFloat(v.replace(/[^0-9.-]+/g, ''))
    return Number.isFinite(n) ? n : 0
  }

  const r = useMemo(
    () =>
      calculateOffset({
        loanAmount: num(loanAmount),
        interestRate: num(interestRate),
        loanTerm: num(loanTerm),
        offsetBalance: num(offsetBalance),
      }),
    [loanAmount, interestRate, loanTerm, offsetBalance],
  )

  const timeSaved = r
    ? `${r.yearsSaved}y ${r.remainingMonthsSaved}m`
    : '—'

  return (
    <div className="space-y-6 animate-children">
      <Card>
        <CardHeader>
          <PiggyBank className="h-5 w-5 text-accent" />
          <CardLabel>Loan &amp; Offset</CardLabel>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Loan Amount" type="number" inputMode="decimal" prefix="$" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
            <Input label="Interest Rate" type="number" inputMode="decimal" suffix="%" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
            <Input label="Loan Term" type="number" inputMode="decimal" suffix="yrs" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} />
            <Input label="Offset Balance" type="number" inputMode="decimal" prefix="$" value={offsetBalance} onChange={(e) => setOffsetBalance(e.target.value)} />
          </div>
        </CardBody>
      </Card>

      {!r ? (
        <Card>
          <CardBody>
            <p className="text-center text-muted-foreground py-8">
              Enter your loan amount, rate and term to see your offset savings.
            </p>
          </CardBody>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card gold>
              <CardBody>
                <div className="text-center">
                  <CardLabel>Interest Saved</CardLabel>
                  <p className="monospace-numbers text-3xl sm:text-4xl font-extrabold text-accent mt-2">
                    {formatCurrency(r.interestSaved)}
                  </p>
                </div>
              </CardBody>
            </Card>
            <Card gold>
              <CardBody>
                <div className="text-center">
                  <CardLabel>Time Saved</CardLabel>
                  <p className="monospace-numbers text-3xl sm:text-4xl font-extrabold text-accent mt-2">
                    {timeSaved}
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardLabel>Comparison</CardLabel>
            </CardHeader>
            <CardBody className="space-y-0">
              <ResultRow label="Monthly repayment" value={formatCurrency(r.monthlyRepayment)} />
              <ResultRow label="Total interest — without offset" value={formatCurrency(r.totalInterestStandard)} />
              <ResultRow label="Total interest — with offset" value={formatCurrency(r.totalInterestOffset)} />
              <ResultRow label="Interest saved" value={formatCurrency(r.interestSaved)} bold gold />
            </CardBody>
          </Card>
        </>
      )}
    </div>
  )
}
