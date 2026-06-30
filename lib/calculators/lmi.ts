// Lender's Mortgage Insurance estimate, ported from realestatecalculators.com.au.
// LMI applies when LVR > 80%. Premium = loan amount × estimated rate.

export type LoanPurpose = 'Owner Occupied' | 'Investment'
export type BorrowerType = 'Standard' | 'First Home Buyer'

export interface LmiInput {
  purchasePrice: number
  depositAmount: number
  loanPurpose: LoanPurpose
  borrowerType: BorrowerType
}

export interface LmiResult {
  price: number
  deposit: number
  loanAmount: number
  lvr: number
  lmiPremium: number
  lmiPercentage: number
  requiresLMI: boolean
}

export function calculateLmi(input: LmiInput): LmiResult | null {
  const { purchasePrice: price, depositAmount: deposit } = input
  if (price <= 0 || deposit < 0 || deposit >= price) return null

  const loanAmount = price - deposit
  const lvr = (loanAmount / price) * 100

  let base = 0
  if (lvr <= 80) base = 0
  else if (lvr <= 85) base = 0.012
  else if (lvr <= 90) base = 0.022
  else if (lvr <= 95) base = 0.035
  else base = 0.045

  let mult = 1
  if (input.loanPurpose === 'Investment') mult += 0.15
  if (input.borrowerType === 'First Home Buyer') mult -= 0.1

  const rate = base * mult
  return {
    price,
    deposit,
    loanAmount,
    lvr,
    lmiPremium: loanAmount * rate,
    lmiPercentage: rate * 100,
    requiresLMI: lvr > 80,
  }
}
