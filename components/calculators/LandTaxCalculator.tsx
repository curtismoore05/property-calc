'use client'

import { useMemo, useState } from 'react'
import { Map } from 'lucide-react'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { Card, CardHeader, CardBody, CardLabel, ResultRow } from '@/components/ui/Card'
import { calculateLandTax, type OwnerType } from '@/lib/calculators/landTax'
import { STATE_OPTIONS, type StateCode } from '@/lib/calculators/stampDuty'
import { formatCurrency, formatPercent } from '@/lib/utils'

const OWNER_OPTIONS = [
  { value: 'Individual', label: 'Individual' },
  { value: 'Company or Trust', label: 'Company or Trust' },
]

export default function LandTaxCalculator() {
  const [state, setState] = useState<StateCode>('VIC')
  const [landValue, setLandValue] = useState('750000')
  const [ownerType, setOwnerType] = useState<OwnerType>('Individual')
  const [vicAbsentee, setVicAbsentee] = useState(false)

  const num = (v: string) => {
    const n = parseFloat(v.replace(/[^0-9.-]+/g, ''))
    return Number.isFinite(n) ? n : 0
  }

  const r = useMemo(
    () => calculateLandTax({ state, landValue: num(landValue), ownerType, vicAbsentee }),
    [state, landValue, ownerType, vicAbsentee],
  )

  return (
    <div className="space-y-6 animate-children">
      <Card>
        <CardHeader>
          <Map className="h-5 w-5 text-accent" />
          <CardLabel>Property Details</CardLabel>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select label="State / Territory" options={STATE_OPTIONS} value={state} onChange={(e) => setState(e.target.value as StateCode)} />
            <Input label="Unimproved Land Value" type="number" inputMode="decimal" prefix="$" value={landValue} onChange={(e) => setLandValue(e.target.value)} />
            <Select label="Owner Type" options={OWNER_OPTIONS} value={ownerType} onChange={(e) => setOwnerType(e.target.value as OwnerType)} />
          </div>
          {state === 'VIC' && (
            <label className="flex items-center gap-3 text-sm text-foreground">
              <input type="checkbox" checked={vicAbsentee} onChange={(e) => setVicAbsentee(e.target.checked)} className="h-4 w-4 accent-[hsl(var(--accent))]" />
              Absentee owner (foreign purchaser) surcharge
            </label>
          )}
        </CardBody>
      </Card>

      {!r ? (
        <Card>
          <CardBody>
            <p className="text-center text-muted-foreground py-8">
              Select your state and enter your land value to see your annual liability.
            </p>
          </CardBody>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardLabel>Assessment</CardLabel>
            </CardHeader>
            <CardBody className="space-y-0">
              <ResultRow label="Assessed land value" value={formatCurrency(num(landValue))} />
              <ResultRow label="Tax-free threshold" value={r.threshold > 0 ? formatCurrency(r.threshold) : 'None'} />
              <ResultRow label="Marginal rate" value={formatPercent(r.marginalRate, 2)} />
            </CardBody>
          </Card>

          <Card gold>
            <CardBody>
              <div className="text-center">
                <CardLabel>Estimated Annual Land Tax</CardLabel>
                <p className="monospace-numbers text-4xl sm:text-5xl font-extrabold text-accent mt-2">
                  {formatCurrency(r.tax)}
                </p>
                {state === 'NT' && (
                  <p className="text-sm text-muted-foreground mt-3">
                    The Northern Territory does not levy general land tax.
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
