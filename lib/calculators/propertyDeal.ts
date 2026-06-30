// Shared property cash-flow + deal-scoring engine, ported from
// realestatecalculators.com.au (the site's `zme` memo). Powers both the
// Cash Flow calculator and the Deal Scorer.

export interface PropertyDealInput {
  purchasePrice: number
  downPayment: number
  interestRate: number
  loanTerm: number
  rentPerWeek: number
  buyingCosts: number
  insurance: number
  councilRates: number
  waterRates: number
  maintenance: number
  strata: number
  otherCosts: number
  vacancyRate: number
  managementFee: number
  rentGrowth: number
  expenseGrowth: number
  expectedGrowth: number
  negativeGearing: boolean
  marginalTaxRate: number
  buildingDepreciation: number
  plantDepreciation: number
  offsetBalance: number
  capitalizeLmi: boolean
  interestOnly: boolean
  monthlySalary: number
  otherMonthlyIncome: number
  existingHousingCost: number
  otherLoanRepayments: number
  livingExpenses: number
  desiredBuffer: number
}

export interface ProjectionYear {
  year: number
  rent: number
  cashFlow: number
  value: number
  growth: number
}

export interface PropertyDealResult {
  loanAmount: number
  lvr: number
  lmi: number
  monthlyRepayment: number
  annualRepayment: number
  annualInterest: number
  grossAnnualRent: number
  effectiveRent: number
  totalAnnualCosts: number
  totalDepreciation: number
  grossYield: number
  preTaxCashFlow: number
  taxBenefit: number
  afterTaxCashFlow: number
  dscr: number
  surplusBeforeProperty: number
  propertyMonthlyImpact: number
  surplusAfterProperty: number
  bufferGap: number
  annualCapitalGrowth: number
  tenYearGrowth: number
  yieldScore: number
  cashFlowScore: number
  bufferScore: number
  dscrScore: number
  growthScore: number
  score: number
  rating: 'Strong Buy' | 'Buy' | 'Hold' | 'Avoid'
  projection: ProjectionYear[]
}

export const DEAL_DEFAULTS: PropertyDealInput = {
  purchasePrice: 800_000,
  downPayment: 160_000,
  interestRate: 6.5,
  loanTerm: 30,
  rentPerWeek: 600,
  buyingCosts: 40_000,
  insurance: 1_500,
  councilRates: 2_000,
  waterRates: 1_000,
  maintenance: 2_000,
  strata: 0,
  otherCosts: 0,
  vacancyRate: 2,
  managementFee: 7,
  rentGrowth: 2,
  expenseGrowth: 3,
  expectedGrowth: 4,
  negativeGearing: true,
  marginalTaxRate: 37,
  buildingDepreciation: 2.5,
  plantDepreciation: 3_000,
  offsetBalance: 0,
  capitalizeLmi: true,
  interestOnly: false,
  monthlySalary: 12_000,
  otherMonthlyIncome: 0,
  existingHousingCost: 0,
  otherLoanRepayments: 0,
  livingExpenses: 4_000,
  desiredBuffer: 1_000,
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

export function calculatePropertyDeal(e: PropertyDealInput): PropertyDealResult {
  let loan = e.purchasePrice - e.downPayment
  const lvrFraction = e.purchasePrice > 0 ? loan / e.purchasePrice : 0

  let lmi = 0
  if (lvrFraction > 0.8) lmi = loan * ((lvrFraction - 0.8) * 0.15)
  if (e.capitalizeLmi) loan += lmi

  const effectiveLoan = Math.max(0, loan - e.offsetBalance)
  const monthlyRate = e.interestRate / 100 / 12
  const months = e.loanTerm * 12

  let monthlyRepayment: number
  if (e.interestOnly) monthlyRepayment = effectiveLoan * monthlyRate
  else if (monthlyRate > 0)
    monthlyRepayment =
      (effectiveLoan * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
      (Math.pow(1 + monthlyRate, months) - 1)
  else monthlyRepayment = effectiveLoan / months

  const annualRepayment = monthlyRepayment * 12
  const annualInterest = effectiveLoan * (e.interestRate / 100)

  const grossAnnualRent = e.rentPerWeek * 52
  const vacancyLoss = grossAnnualRent * (e.vacancyRate / 100)
  const mgmtFee = (grossAnnualRent - vacancyLoss) * (e.managementFee / 100)
  const effectiveRent = grossAnnualRent - vacancyLoss - mgmtFee

  const totalAnnualCosts =
    e.insurance + e.councilRates + e.waterRates + e.maintenance + e.strata + e.otherCosts
  const buildingDep = e.purchasePrice * 0.8 * (e.buildingDepreciation / 100)
  const totalDepreciation = buildingDep + e.plantDepreciation
  const grossYield = e.purchasePrice > 0 ? grossAnnualRent / e.purchasePrice : 0

  const preTaxCashFlow = effectiveRent - totalAnnualCosts - annualRepayment

  let taxBenefit = 0
  if (e.negativeGearing) {
    const deductions = totalAnnualCosts + annualInterest + totalDepreciation
    const net = effectiveRent - deductions
    taxBenefit = net < 0 ? Math.abs(net) * (e.marginalTaxRate / 100) : -net * (e.marginalTaxRate / 100)
  }
  const afterTaxCashFlow = preTaxCashFlow + taxBenefit
  const dscr = annualRepayment > 0 ? effectiveRent / annualRepayment : 999

  const totalMonthlyIncome = e.monthlySalary + e.otherMonthlyIncome
  const existingOutgoings = e.existingHousingCost + e.otherLoanRepayments + e.livingExpenses
  const surplusBeforeProperty = totalMonthlyIncome - existingOutgoings
  const propertyMonthlyImpact =
    monthlyRepayment + totalAnnualCosts / 12 - effectiveRent / 12 - taxBenefit / 12
  const surplusAfterProperty = surplusBeforeProperty - propertyMonthlyImpact
  const bufferGap = surplusAfterProperty - e.desiredBuffer

  const annualCapitalGrowth = e.purchasePrice * (e.expectedGrowth / 100)
  const tenYearGrowth = e.purchasePrice * Math.pow(1 + e.expectedGrowth / 100, 10) - e.purchasePrice

  const yieldScore = clamp(((grossYield * 100) / 5) * 20, 0, 20)
  const cashFlowScore = clamp(10 + (afterTaxCashFlow / 5000) * 10, 0, 20)
  const bufferScore = clamp(10 + (bufferGap / 1000) * 10, 0, 20)
  const dscrScore = clamp((dscr / 1.25) * 20, 0, 20)
  const growthScore = clamp((e.expectedGrowth / 6) * 20, 0, 20)
  const score = yieldScore + cashFlowScore + bufferScore + dscrScore + growthScore

  let rating: PropertyDealResult['rating'] = 'Avoid'
  if (score >= 85) rating = 'Strong Buy'
  else if (score >= 75) rating = 'Buy'
  else if (score >= 60) rating = 'Hold'

  // 10-year projection (rent and expenses grow each year; repayment fixed).
  const projection: ProjectionYear[] = []
  let value = e.purchasePrice
  let rent = grossAnnualRent
  let costs = totalAnnualCosts
  for (let year = 1; year <= 10; year++) {
    const growth = value * (e.expectedGrowth / 100)
    value += growth
    const vac = rent * (e.vacancyRate / 100)
    const mgmt = (rent - vac) * (e.managementFee / 100)
    const effRent = rent - vac - mgmt
    let tax = 0
    if (e.negativeGearing) {
      const deduct = costs + annualInterest + totalDepreciation
      const net = effRent - deduct
      tax = net < 0 ? Math.abs(net) * (e.marginalTaxRate / 100) : -net * (e.marginalTaxRate / 100)
    }
    const cashFlow = effRent - costs - annualRepayment + tax
    projection.push({ year, rent: effRent, cashFlow, value, growth })
    rent *= 1 + e.rentGrowth / 100
    costs *= 1 + e.expenseGrowth / 100
  }

  return {
    loanAmount: loan,
    lvr: lvrFraction * 100,
    lmi,
    monthlyRepayment,
    annualRepayment,
    annualInterest,
    grossAnnualRent,
    effectiveRent,
    totalAnnualCosts,
    totalDepreciation,
    grossYield,
    preTaxCashFlow,
    taxBenefit,
    afterTaxCashFlow,
    dscr,
    surplusBeforeProperty,
    propertyMonthlyImpact,
    surplusAfterProperty,
    bufferGap,
    annualCapitalGrowth,
    tenYearGrowth,
    yieldScore,
    cashFlowScore,
    bufferScore,
    dscrScore,
    growthScore,
    score,
    rating,
    projection,
  }
}
