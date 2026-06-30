'use client'

import { useMemo, useState } from 'react'
import { Receipt } from 'lucide-react'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { Card, CardHeader, CardBody, CardLabel, ResultRow } from '@/components/ui/Card'
import { calculateCgt, type AssetType } from '@/lib/calculators/cgt'
import { formatCurrency, formatPercent } from '@/lib/utils'

const ASSET_OPTIONS = [
  { value: 'Residential Property', label: 'Residential Property' },
  { value: 'Other Asset', label: 'Other Asset' },
]

export default function CGTCalculator() {
  const [assetType, setAssetType] = useState<AssetType>('Residential Property')
  const [isNewBuild, setIsNewBuild] = useState(false)
  const [purchasePrice, setPurchasePrice] = useState('600000')
  const [salePrice, setSalePrice] = useState('850000')
  const [purchaseDate, setPurchaseDate] = useState('')
  const [saleDate, setSaleDate] = useState('')
  const [capitalImprovements, setCapitalImprovements] = useState('0')
  const [cpiRate, setCpiRate] = useState('3')
  const [income, setIncome] = useState('90000')

  const num = (v: string) => {
    const n = parseFloat(v.replace(/[^0-9.-]+/g, ''))
    return Number.isFinite(n) ? n : 0
  }

  const r = useMemo(
    () =>
      calculateCgt({
        assetType,
        isNewBuild,
        purchasePrice: num(purchasePrice),
        salePrice: num(salePrice),
        capitalImprovements: num(capitalImprovements),
        cpiRate: num(cpiRate),
        income: num(income),
        purchaseDate,
        saleDate,
      }),
    [assetType, isNewBuild, purchasePrice, salePrice, capitalImprovements, cpiRate, income, purchaseDate, saleDate],
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <Receipt className="h-5 w-5 text-accent" />
          <CardLabel>Asset &amp; Sale Details</CardLabel>
        </CardHeader>
        <CardBody>
          <Select label="Asset Type" options={ASSET_OPTIONS} value={assetType} onChange={(e) => setAssetType(e.target.value as AssetType)} />
          <label className="flex items-center gap-3 text-sm text-foreground">
            <input type="checkbox" checked={isNewBuild} onChange={(e) => setIsNewBuild(e.target.checked)} className="h-4 w-4 accent-[hsl(var(--accent))]" />
            New build (eligible for 50% discount)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Purchase Price" type="number" inputMode="decimal" prefix="$" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} />
            <Input label="Sale Price" type="number" inputMode="decimal" prefix="$" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} />
            <Input label="Date of Purchase" type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} />
            <Input label="Date of Sale" type="date" value={saleDate} onChange={(e) => setSaleDate(e.target.value)} />
            <Input label="Capital Improvements" type="number" inputMode="decimal" prefix="$" value={capitalImprovements} onChange={(e) => setCapitalImprovements(e.target.value)} />
            <Input label="Taxable Income" type="number" inputMode="decimal" prefix="$" value={income} onChange={(e) => setIncome(e.target.value)} />
            <Input label="CPI / Inflation Rate" type="number" inputMode="decimal" suffix="%" value={cpiRate} onChange={(e) => setCpiRate(e.target.value)} />
          </div>
        </CardBody>
      </Card>

      {!r ? (
        <Card>
          <CardBody>
            <p className="text-center text-muted-foreground py-8">
              Enter purchase price, sale price and taxable income to estimate your CGT.
            </p>
          </CardBody>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardLabel>Capital Gain</CardLabel>
            </CardHeader>
            <CardBody className="space-y-0">
              <ResultRow label="Sale price" value={formatCurrency(r.salePrice)} />
              <ResultRow label="Less indexed cost base" value={`-${formatCurrency(r.indexedCostBase)}`} />
              <ResultRow label="Less capital improvements" value={`-${formatCurrency(r.improvements)}`} />
              <ResultRow label="Capital gain" value={formatCurrency(r.capitalGain)} bold gold />
              {r.isEligibleForDiscount && (
                <ResultRow label="50% new-build discount" value={`-${formatCurrency(r.discount)}`} />
              )}
              <ResultRow label="Taxable capital gain" value={formatCurrency(r.taxableCapitalGain)} />
              <ResultRow label="Marginal tax rate" value={formatPercent(r.marginalTaxRate * 100, 1)} />
            </CardBody>
          </Card>

          <Card gold>
            <CardBody>
              <div className="text-center">
                <CardLabel>Estimated CGT Payable</CardLabel>
                <p className="monospace-numbers text-4xl sm:text-5xl font-extrabold text-accent mt-2">
                  {formatCurrency(r.taxPayable)}
                </p>
              </div>
            </CardBody>
          </Card>
        </>
      )}
    </div>
  )
}
