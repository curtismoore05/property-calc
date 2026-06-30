'use client'

import { useMemo, useState } from 'react'
import { Shield } from 'lucide-react'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { Card, CardHeader, CardBody, CardLabel, ResultRow } from '@/components/ui/Card'
import { calculateLmi, type BorrowerType, type LoanPurpose } from '@/lib/calculators/lmi'
import { formatCurrency } from '@/lib/utils'

const PURPOSE_OPTIONS = [
  { value: 'Owner Occupied', label: 'Owner Occupied' },
  { value: 'Investment', label: 'Investment' },
]
const BORROWER_OPTIONS = [
  { value: 'Standard', label: 'Standard' },
  { value: 'First Home Buyer', label: 'First Home Buyer' },
]

export default function LMIEstimator() {
  const [purchasePrice, setPurchasePrice] = useState('800000')
  const [depositAmount, setDepositAmount] = useState('120000')
  const [loanPurpose, setLoanPurpose] = useState<LoanPurpose>('Owner Occupied')
  const [borrowerType, setBorrowerType] = useState<BorrowerType>('Standard')

  const num = (v: string) => {
    const n = parseFloat(v.replace(/[^0-9.-]+/g, ''))
    return Number.isFinite(n) ? n : 0
  }

  const r = useMemo(
    () =>
      calculateLmi({
        purchasePrice: num(purchasePrice),
        depositAmount: num(depositAmount),
        loanPurpose,
        borrowerType,
      }),
    [purchasePrice, depositAmount, loanPurpose, borrowerType],
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <Shield className="h-5 w-5 text-accent" />
          <CardLabel>Loan Details</CardLabel>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Purchase Price" type="number" inputMode="decimal" prefix="$" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} />
            <Input label="Deposit" type="number" inputMode="decimal" prefix="$" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
            <Select label="Loan Purpose" options={PURPOSE_OPTIONS} value={loanPurpose} onChange={(e) => setLoanPurpose(e.target.value as LoanPurpose)} />
            <Select label="Borrower Type" options={BORROWER_OPTIONS} value={borrowerType} onChange={(e) => setBorrowerType(e.target.value as BorrowerType)} />
          </div>
        </CardBody>
      </Card>

      {!r ? (
        <Card>
          <CardBody>
            <p className="text-center text-muted-foreground py-8">
              Enter a purchase price and deposit (less than the price) to estimate your LMI.
            </p>
          </CardBody>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardLabel>{r.requiresLMI ? 'LMI Required' : 'No LMI Required'}</CardLabel>
            </CardHeader>
            <CardBody className="space-y-0">
              <p className="text-sm text-muted-foreground pb-4">
                Your Loan to Value Ratio (LVR) is{' '}
                <span className="monospace-numbers font-semibold text-foreground">{r.lvr.toFixed(2)}%</span>.{' '}
                {r.requiresLMI
                  ? 'Because it is over 80%, you will likely need to pay Lender’s Mortgage Insurance.'
                  : 'Because it is 80% or below, you typically avoid Lender’s Mortgage Insurance.'}
              </p>
              <ResultRow label="Property value" value={formatCurrency(r.price)} />
              <ResultRow label="Loan amount" value={formatCurrency(r.loanAmount)} />
              <ResultRow label="Effective LVR" value={`${r.lvr.toFixed(2)}%`} />
              <ResultRow label="LMI rate (estimated)" value={`${r.lmiPercentage.toFixed(2)}%`} />
            </CardBody>
          </Card>

          <Card gold>
            <CardBody>
              <div className="text-center">
                <CardLabel>Estimated LMI Premium</CardLabel>
                <p className="monospace-numbers text-4xl sm:text-5xl font-extrabold text-accent mt-2">
                  {formatCurrency(r.lmiPremium)}
                </p>
                {r.requiresLMI && (
                  <p className="text-sm text-muted-foreground mt-4">
                    Typically added to your loan, for a total of{' '}
                    <strong className="text-foreground">{formatCurrency(r.loanAmount + r.lmiPremium)}</strong>.
                  </p>
                )}
              </div>
            </CardBody>
          </Card>
        </>
      )}
    </div>
  )
}
