// Capital Gains Tax estimate, ported from realestatecalculators.com.au.
// Uses an indexed cost base (CPI-grown purchase price). Note: the source site
// grants the 50% CGT discount only for a residential "new build" — this mirrors
// that behaviour. Resident marginal rates, no Medicare levy.

export type AssetType = 'Residential Property' | 'Other Asset'

export interface CgtInput {
  assetType: AssetType
  isNewBuild: boolean
  purchasePrice: number
  salePrice: number
  capitalImprovements: number
  /** CPI / inflation rate as a percent, e.g. 3 */
  cpiRate: number
  /** Annual taxable income, used for the marginal rate */
  income: number
  purchaseDate?: string
  saleDate?: string
}

export interface CgtResult {
  indexedCostBase: number
  capitalGain: number
  taxableCapitalGain: number
  taxPayable: number
  discount: number
  isEligibleForDiscount: boolean
  marginalTaxRate: number
  salePrice: number
  purchasePrice: number
  improvements: number
}

function marginalRate(income: number): number {
  if (income < 18_201) return 0
  if (income <= 45_000) return 0.19
  if (income <= 120_000) return 0.325
  if (income < 180_000) return 0.37
  return 0.45
}

export function calculateCgt(input: CgtInput): CgtResult | null {
  const { purchasePrice, salePrice, income } = input
  if (purchasePrice <= 0 || salePrice <= 0 || income <= 0) return null

  const improvements = input.capitalImprovements
  const g = input.cpiRate / 100

  let years = 10
  if (input.purchaseDate && input.saleDate) {
    const start = new Date(input.purchaseDate)
    const end = new Date(input.saleDate)
    if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
      years = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
      if (years < 0) years = 0
    }
  }

  const indexedCostBase = purchasePrice * Math.pow(1 + g, years)
  const capitalGain = Math.max(0, salePrice - indexedCostBase - improvements)
  const isEligibleForDiscount =
    input.assetType === 'Residential Property' && input.isNewBuild
  const discount = isEligibleForDiscount && capitalGain > 0 ? capitalGain * 0.5 : 0
  const taxableCapitalGain = capitalGain - discount
  const rate = marginalRate(income)

  return {
    indexedCostBase,
    capitalGain,
    taxableCapitalGain,
    taxPayable: taxableCapitalGain * rate,
    discount,
    isEligibleForDiscount,
    marginalTaxRate: rate,
    salePrice,
    purchasePrice,
    improvements,
  }
}
