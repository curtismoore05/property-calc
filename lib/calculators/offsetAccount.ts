// Offset account savings, ported from realestatecalculators.com.au.
// Compares a standard P&I loan against the same loan where the offset balance
// reduces the interest-bearing principal each month (repayment kept constant,
// so the loan is paid off sooner).

export interface OffsetInput {
  loanAmount: number
  /** Annual interest rate as a percent, e.g. 6.5 */
  interestRate: number
  /** Loan term in years */
  loanTerm: number
  offsetBalance: number
}

export interface OffsetYearPoint {
  year: number
  standardBalance: number
  offsetBalance: number
}

export interface OffsetResult {
  monthlyRepayment: number
  totalInterestStandard: number
  totalInterestOffset: number
  interestSaved: number
  monthsSaved: number
  yearsSaved: number
  remainingMonthsSaved: number
  chartData: OffsetYearPoint[]
}

export function calculateOffset(input: OffsetInput): OffsetResult | null {
  const principal = input.loanAmount
  const annualRate = input.interestRate / 100
  const years = input.loanTerm
  const offset = input.offsetBalance
  if (principal <= 0 || annualRate <= 0 || years <= 0) return null

  const monthlyRate = annualRate / 12
  const months = years * 12
  const repayment =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
    (Math.pow(1 + monthlyRate, months) - 1)

  // Standard amortisation schedule (yearly snapshots).
  let stdBalance = principal
  let totalInterestStandard = 0
  const chartData: OffsetYearPoint[] = []
  for (let k = 1; k <= months; k++) {
    const interest = stdBalance * monthlyRate
    totalInterestStandard += interest
    stdBalance = stdBalance + interest - repayment
    if (stdBalance < 0) stdBalance = 0
    if (k % 12 === 0 || k === 1) {
      chartData.push({ year: k / 12, standardBalance: stdBalance, offsetBalance: 0 })
    }
  }

  // Offset schedule: interest charged only on (balance - offset).
  let offBalance = principal
  let totalInterestOffset = 0
  let monthsToPayoff = 0
  let snap = 0
  for (let k = 1; k <= months; k++) {
    if (offBalance > 0) {
      const interest = Math.max(0, offBalance - offset) * monthlyRate
      totalInterestOffset += interest
      offBalance = offBalance - (repayment - interest)
      monthsToPayoff++
      if (offBalance < 0) offBalance = 0
    }
    if (k % 12 === 0 || k === 1) {
      if (chartData[snap]) chartData[snap].offsetBalance = offBalance
      snap++
    }
  }
  for (let k = snap; k < chartData.length; k++) chartData[k].offsetBalance = 0

  const monthsSaved = months - monthsToPayoff
  return {
    monthlyRepayment: repayment,
    totalInterestStandard,
    totalInterestOffset,
    interestSaved: totalInterestStandard - totalInterestOffset,
    monthsSaved,
    yearsSaved: Math.floor(monthsSaved / 12),
    remainingMonthsSaved: monthsSaved % 12,
    chartData,
  }
}
