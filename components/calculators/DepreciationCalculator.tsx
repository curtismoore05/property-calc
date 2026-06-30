'use client'

import { useMemo, useState } from 'react'
import { ArrowDownRight } from 'lucide-react'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { Card, CardHeader, CardBody, CardLabel, ResultRow } from '@/components/ui/Card'
import { calculateDepreciation, type DwellingType } from '@/lib/calculators/depreciation'
import { formatCurrency } from '@/lib/utils'

const TYPE_OPTIONS = [
  { value: 'House', label: 'House' },
  { value: 'Apartment', label: 'Apartment' },
  { value: 'Townhouse', label: 'Townhouse' },
]

export default function DepreciationCalculator() {
  const [propertyType, setPropertyType] = useState<DwellingType>('House')
  const [yearBuilt, setYearBuilt] = useState('2015')
  const [purchasePrice, setPurchasePrice] = useState('600000')

  const num = (v: string) => {
    const n = parseFloat(v.replace(/[^0-9.-]+/g, ''))
    return Number.isFinite(n) ? n : 0
  }

  const r = useMemo(
    () =>
      calculateDepreciation({
        propertyType,
        yearBuilt: num(yearBuilt),
        purchasePrice: num(purchasePrice),
      }),
    [propertyType, yearBuilt, purchasePrice],
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <ArrowDownRight className="h-5 w-5 text-accent" />
          <CardLabel>Property Details</CardLabel>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select label="Property Type" options={TYPE_OPTIONS} value={propertyType} onChange={(e) => setPropertyType(e.target.value as DwellingType)} />
            <Input label="Year Built" type="number" inputMode="numeric" value={yearBuilt} onChange={(e) => setYearBuilt(e.target.value)} />
            <Input label="Purchase Price" type="number" inputMode="decimal" prefix="$" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} />
          </div>
        </CardBody>
      </Card>

      {!r ? (
        <Card>
          <CardBody>
            <p className="text-center text-muted-foreground py-8">
              Enter the year built and purchase price to estimate depreciation deductions.
            </p>
          </CardBody>
        </Card>
      ) : (
        <>
          <Card gold>
            <CardBody>
              <div className="text-center">
                <CardLabel>First-Year Depreciation</CardLabel>
                <p className="monospace-numbers text-4xl sm:text-5xl font-extrabold text-accent mt-2">
                  {formatCurrency(r.year1Depreciation)}
                </p>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardLabel>5-Year Schedule</CardLabel>
            </CardHeader>
            <CardBody className="space-y-0">
              {r.schedule.map((s) => (
                <ResultRow key={s.year} label={`Year ${s.year}`} value={formatCurrency(s.depreciation)} />
              ))}
            </CardBody>
          </Card>
        </>
      )}
    </div>
  )
}
