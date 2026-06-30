// Borrowing capacity estimate, ported from realestatecalculators.com.au.
// Capacity ≈ 6× net annual income (income less annualised expenses).

export type Frequency = 'Per month' | 'Per year'

export interface BorrowingInput {
  annualSalary: number
  partnerSalary: number
  /** Rental income entered per month (annualised ×12). */
  monthlyRentalIncome: number
  otherAnnualIncome: number
  bills: number
  billsFrequency: Frequency
  homeLoanRepayments: number
  homeLoanFrequency: Frequency
  otherLoanRepayments: number
  otherLoanFrequency: Frequency
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

  const totalExpenses =
    annualise(input.bills, input.billsFrequency) +
    annualise(input.homeLoanRepayments, input.homeLoanFrequency) +
    annualise(input.otherLoanRepayments, input.otherLoanFrequency)

  const netIncome = Math.max(0, totalIncome - totalExpenses)
  return {
    totalIncome,
    totalExpenses,
    netIncome,
    monthlyNet: netIncome / 12,
    borrowingCapacity: netIncome * 6,
  }
}
