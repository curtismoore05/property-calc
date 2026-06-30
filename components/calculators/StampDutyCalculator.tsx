'use client'

import { useMemo, useState } from 'react'
import { Landmark } from 'lucide-react'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { Card, CardHeader, CardBody, CardLabel, ResultRow } from '@/components/ui/Card'
import { CalcGrid, CalcInputs, CalcResults } from '@/components/calculators/CalcLayout'
import Ticker from '@/components/ui/Ticker'
import {
  calculateStampDuty,
  STATE_OPTIONS,
  type BuyerType,
  type PropertyType,
  type StateCode,
} from '@/lib/calculators/stampDuty'
import { formatCurrency } from '@/lib/utils'

const BUYER_OPTIONS = [
  { value: 'Owner-Occupier', label: 'Owner-Occupier' },
  { value: 'First Home Buyer', label: 'First Home Buyer' },
  { value: 'Investor', label: 'Investor' },
]
const PROPERTY_OPTIONS = [
  { value: 'Residential', label: 'Residential' },
  { value: 'Investment', label: 'Investment' },
]

export default function StampDutyCalculator() {
  const [buyerType, setBuyerType] = useState<BuyerType>('Owner-Occupier')
  const [state, setState] = useState<StateCode>('NSW')
  const [propertyType, setPropertyType] = useState<PropertyType>('Residential')
  const [purchasePrice, setPurchasePrice] = useState('800000')
  const [loanAmount, setLoanAmount] = useState('640000')
  const [conveyancing, setConveyancing] = useState('1500')
  const [bankFees, setBankFees] = useState('800')
  const [otherCosts, setOtherCosts] = useState('0')

  const num = (v: string) => {
    const n = parseFloat(v.replace(/[^0-9.-]+/g, ''))
    return Number.isFinite(n) ? n : 0
  }

  const r = useMemo(
    () =>
      calculateStampDuty({
        buyerType,
        state,
        propertyType,
        purchasePrice: num(purchasePrice),
        loanAmount: num(loanAmount),
        conveyancing: num(conveyancing),
        bankFees: num(bankFees),
        otherCosts: num(otherCosts),
      }),
    [buyerType, state, propertyType, purchasePrice, loanAmount, conveyancing, bankFees, otherCosts],
  )

  return (
    <CalcGrid>
      <CalcInputs>
      <Card>
        <CardHeader>
          <Landmark className="h-5 w-5 text-accent" />
          <CardLabel>Purchase Details</CardLabel>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select label="Buyer Type" options={BUYER_OPTIONS} value={buyerType} onChange={(e) => setBuyerType(e.target.value as BuyerType)} />
            <Select label="State / Territory" options={STATE_OPTIONS} value={state} onChange={(e) => setState(e.target.value as StateCode)} />
          </div>
          <Select label="Property Type" options={PROPERTY_OPTIONS} value={propertyType} onChange={(e) => setPropertyType(e.target.value as PropertyType)} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Purchase Price" type="number" inputMode="decimal" prefix="$" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} />
            <Input label="Loan Amount" type="number" inputMode="decimal" prefix="$" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardLabel>Conveyancing &amp; Other Costs</CardLabel>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input label="Conveyancing" type="number" inputMode="decimal" prefix="$" value={conveyancing} onChange={(e) => setConveyancing(e.target.value)} />
            <Input label="Bank Fees" type="number" inputMode="decimal" prefix="$" value={bankFees} onChange={(e) => setBankFees(e.target.value)} />
            <Input label="Other" type="number" inputMode="decimal" prefix="$" value={otherCosts} onChange={(e) => setOtherCosts(e.target.value)} />
          </div>
        </CardBody>
      </Card>

      </CalcInputs>

      <CalcResults>
      <Card>
        <CardHeader>
          <CardLabel>Government Costs</CardLabel>
        </CardHeader>
        <CardBody className="space-y-0">
          <ResultRow label="Stamp duty" value={formatCurrency(r.stampDuty)} />
          <ResultRow label="Mortgage registration" value={formatCurrency(r.regMortgage)} />
          <ResultRow label="Discharge of mortgage" value={formatCurrency(r.regDischarge)} />
          <ResultRow label="Transfer fee" value={formatCurrency(r.regTransfer)} />
          <ResultRow label="Subtotal — government" value={formatCurrency(r.subtotalGov)} bold />
          <div className="pt-4" />
          <ResultRow label="Conveyancing" value={formatCurrency(r.conveyancing)} />
          <ResultRow label="Bank fees" value={formatCurrency(r.bankFees)} />
          <ResultRow label="Other" value={formatCurrency(r.otherCosts)} />
          <ResultRow label="Subtotal — other" value={formatCurrency(r.subtotalOther)} bold />
        </CardBody>
      </Card>

      <Card gold>
        <CardBody>
          <div className="text-center">
            <CardLabel>Total Upfront Costs</CardLabel>
            <p className="monospace-numbers text-4xl sm:text-5xl font-extrabold text-accent mt-2">
              <Ticker value={r.totalUpfront} format={formatCurrency} />
            </p>
          </div>
        </CardBody>
      </Card>
      </CalcResults>
    </CalcGrid>
  )
}
