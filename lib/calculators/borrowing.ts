// Borrowing capacity estimate, ported from realestatecalculators.com.au.

export type Frequency = 'Per month' | 'Per year'
export type LoanPurpose = 'owner-occupied' | 'investment'

export interface BorrowingInput {
  loanPurpose: LoanPurpose
  numberOfChildren: number
  annualSalary: number
  partnerSalary: number
  /** Rental income entered per month (annualised x12). */
  monthlyRentalIncome: number
  otherAnnualIncome: number
  bills: number
  billsFrequency: Frequency
  homeLoanRepayments: number
  homeLoanFrequency: Frequency
  otherLoanRepayments: number
  otherLoanFrequency: Frequency
  /** Total credit card limit — lenders count 3% per month as a commitment. */
  creditCardLimit: number
}

export interface BorrowingResult {
  totalIncome: number
  totalExpenses: number
  netIncome: number
  monthlyNet: number
  borrowingCapacity: number
}

const annualise = (amount: number, freq: Frequency) =>
  freq === 'Per month' ? amount * 12 : amount

export function calculateBorrowing(input: BorrowingInput): BorrowingResult {
  const totalIncome =
    input.annualSalary +
    input.partnerSalary +
    input.monthlyRentalIncome * 12 +
    input.otherAnnualIncome

  // $4,000/yr per dependent child (HEM adjustment).
  const childrenCost = input.numberOfChildren * 4000
  // Lenders assess credit card commitments at 3% of limit per month.
  const creditCardAnnual = input.creditCardLimit * 0.03 * 12

  const totalExpenses =
    annualise(input.bills, input.billsFrequency) +
    annualise(input.homeLoanRepayments, input.homeLoanFrequency) +
    annualise(input.otherLoanRepayments, input.otherLoanFrequency) +
    childrenCost +
    creditCardAnnual

  const netIncome = Math.max(0, totalIncome - totalExpenses)

  // Investment loans are assessed at a higher rate, reducing capacity slightly.
  const multiplier = input.loanPurpose === 'investment' ? 5.5 : 6

  return {
    totalIncome,
    totalExpenses,
    netIncome,
    monthlyNet: netIncome / 12,
    borrowingCapacity: netIncome * multiplier,
  }
}
