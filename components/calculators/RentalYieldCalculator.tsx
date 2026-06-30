'use client'

import { useState } from 'react'
import { TrendingUp } from 'lucide-react'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { Card, CardHeader, CardBody, CardLabel, ResultRow } from '@/components/ui/Card'
import {
  calculateRentalYield,
  type RentalYieldResult,
  type RentFrequency,
} from '@/lib/calculators/rentalYield'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { CalcGrid, CalcInputs, CalcResults } from '@/components/calculators/CalcLayout'
import Ticker from '@/components/ui/Ticker'

const FREQUENCY_OPTIONS = [
  { value: 'weekly', label: 'per week' },
  { value: 'monthly', label: 'per month' },
  { value: 'annual', label: 'per year' },
]

// Rental Yield is the one calculator with an explicit Calculate button
// (and the only blue button on the site) — results are not real-time.
export default function RentalYieldCalculator() {
  const [propertyPrice, setPropertyPrice] = useState('750000')
  const [rent, setRent] = useState('650')
  const [rentFrequency, setRentFrequency] = useState<RentFrequency>('weekly')
  const [vacancyRate, setVacancyRate] = useState('2')
  const [annualExpenses, setAnnualExpenses] = useState('4000')
  const [result, setResult] = useState<RentalYieldResult | null>(null)

  const num = (v: string) => {
    const n = parseFloat(v)
    return Number.isFinite(n) ? n : 0
  }

  const handleCalculate = () => {
    setResult(
      calculateRentalYield({
        propertyPrice: num(propertyPrice),
        rent: num(rent),
        rentFrequency,
        vacancyRate: num(vacancyRate),
        annualExpenses: num(annualExpenses),
      }),
    )
  }

  return (
    <CalcGrid>
      <CalcInputs>
      <Card>
        <CardHeader>
          <TrendingUp className="h-5 w-5 text-accent" />
          <CardLabel>Your Investment</CardLabel>
        </CardHeader>
        <CardBody>
          <Input
            label="Property Price"
            type="number"
            inputMode="decimal"
            prefix="$"
            value={propertyPrice}
            onChange={(e) => setPropertyPrice(e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Rent"
              type="number"
              inputMode="decimal"
              prefix="$"
              value={rent}
              onChange={(e) => setRent(e.target.value)}
            />
            <Select
              label="Frequency"
              options={FREQUENCY_OPTIONS}
              value={rentFrequency}
              onChange={(e) => setRentFrequency(e.target.value as RentFrequency)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Vacancy Rate"
              type="number"
              inputMode="decimal"
              suffix="%"
              value={vacancyRate}
              onChange={(e) => setVacancyRate(e.target.value)}
            />
            <Input
              label="Annual Expenses"
              type="number"
              inputMode="decimal"
              prefix="$"
              value={annualExpenses}
              onChange={(e) => setAnnualExpenses(e.target.value)}
            />
          </div>

          <Button variant="blue" size="lg" className="w-full" onClick={handleCalculate}>
            Calculate
          </Button>
        </CardBody>
      </Card>
      </CalcInputs>

      <CalcResults>
      {result && (
        <Card gold>
          <CardHeader>
            <CardLabel>Results</CardLabel>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border p-4 text-center">
                <CardLabel>Gross Yield</CardLabel>
                <p className="monospace-numbers text-3xl font-bold text-accent mt-1">
                  <Ticker value={result.grossYield} format={(n) => formatPercent(n, 2)} />
                </p>
              </div>
              <div className="rounded-xl border border-border p-4 text-center">
                <CardLabel>Net Yield</CardLabel>
                <p className="monospace-numbers text-3xl font-bold text-accent mt-1">
                  <Ticker value={result.netYield} format={(n) => formatPercent(n, 2)} />
                </p>
              </div>
            </div>

            <div>
              <ResultRow label="Annual rent (gross)" value={formatCurrency(result.annualRent)} />
              <ResultRow
                label="Effective rent (after vacancy)"
                value={formatCurrency(result.effectiveAnnualRent)}
              />
            </div>
          </CardBody>
        </Card>
      )}
      </CalcResults>
    </CalcGrid>
  )
}
