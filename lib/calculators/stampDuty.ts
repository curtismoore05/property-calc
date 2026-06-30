// Stamp duty + upfront purchase costs, ported from realestatecalculators.com.au.
// NSW and VIC use full progressive tables; all other states/territories use a
// flat 4.5% estimate (mirrors the source site). Figures are estimates only.

export type StateCode = 'NSW' | 'VIC' | 'QLD' | 'SA' | 'WA' | 'TAS' | 'ACT' | 'NT'
export type BuyerType = 'Owner-Occupier' | 'First Home Buyer' | 'Investor'
export type PropertyType = 'Residential' | 'Investment'

export interface StampDutyInput {
  buyerType: BuyerType
  state: StateCode
  propertyType: PropertyType
  purchasePrice: number
  loanAmount: number
  conveyancing: number
  bankFees: number
  otherCosts: number
}

export interface StampDutyResult {
  stampDuty: number
  regMortgage: number
  regDischarge: number
  regTransfer: number
  subtotalGov: number
  conveyancing: number
  bankFees: number
  otherCosts: number
  subtotalOther: number
  totalUpfront: number
}

export const STATE_OPTIONS: { value: StateCode; label: string }[] = [
  { value: 'NSW', label: 'New South Wales (NSW)' },
  { value: 'VIC', label: 'Victoria (VIC)' },
  { value: 'QLD', label: 'Queensland (QLD)' },
  { value: 'SA', label: 'South Australia (SA)' },
  { value: 'WA', label: 'Western Australia (WA)' },
  { value: 'TAS', label: 'Tasmania (TAS)' },
  { value: 'ACT', label: 'Australian Capital Territory (ACT)' },
  { value: 'NT', label: 'Northern Territory (NT)' },
]

// Per-state registration fee (applied to mortgage, discharge and transfer).
const REG_FEE: Record<StateCode, number> = {
  NSW: 176, VIC: 200, QLD: 208, WA: 187, SA: 180, TAS: 146, ACT: 160, NT: 155,
}

function nswDuty(buyer: BuyerType, p: number): number {
  if (buyer === 'First Home Buyer' && p <= 800_000) return 0
  if (p <= 14_000) return p * 0.0125
  if (p <= 30_000) return 175 + (p - 14_000) * 0.025
  if (p <= 130_000) return 575 + (p - 30_000) * 0.035
  if (p <= 955_000) return 4_075 + (p - 130_000) * 0.045
  return 41_200 + (p - 955_000) * 0.055
}

function vicDuty(buyer: BuyerType, p: number): number {
  if (buyer === 'First Home Buyer' && p <= 600_000) return 0
  if (p <= 25_000) return p * 0.014
  if (p <= 100_000) return 350 + (p - 25_000) * 0.024
  if (p <= 500_000) return 2_150 + (p - 100_000) * 0.055
  if (p <= 750_000) return 24_150 + (p - 500_000) * 0.065
  return 40_400 + (p - 750_000) * 0.075
}

export function calculateStampDuty(input: StampDutyInput): StampDutyResult {
  const { buyerType, state, purchasePrice: p, loanAmount } = input

  let stampDuty: number
  if (state === 'NSW') stampDuty = nswDuty(buyerType, p)
  else if (state === 'VIC') stampDuty = vicDuty(buyerType, p)
  else stampDuty = p * 0.045 // flat estimate for remaining states

  const fee = REG_FEE[state]
  let regMortgage = fee
  let regDischarge = fee
  const regTransfer = fee
  // No mortgage registration/discharge fees when there is no loan.
  if (loanAmount <= 0) {
    regMortgage = 0
    regDischarge = 0
  }

  const subtotalGov = stampDuty + regMortgage + regDischarge + regTransfer
  const subtotalOther = input.conveyancing + input.bankFees + input.otherCosts
  const totalUpfront = subtotalGov + subtotalOther

  return {
    stampDuty,
    regMortgage,
    regDischarge,
    regTransfer,
    subtotalGov,
    conveyancing: input.conveyancing,
    bankFees: input.bankFees,
    otherCosts: input.otherCosts,
    subtotalOther,
    totalUpfront,
  }
}
