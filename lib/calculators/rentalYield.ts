// Rental yield calculations.
// Gross yield = annual rent / price.
// Net yield   = (vacancy-adjusted rent - annual expenses) / price.

export type RentFrequency = 'weekly' | 'monthly' | 'annual'

export interface RentalYieldInput {
  propertyPrice: number
  rent: number
  rentFrequency: RentFrequency
  /** Vacancy rate as a percentage, e.g. 2 means 2% of the year vacant. */
  vacancyRate: number
  annualExpenses: number
}

export interface RentalYieldResult {
  annualRent: number
  effectiveAnnualRent: number
  grossYield: number
  netYield: number
}

const FREQUENCY_MULTIPLIER: Record<RentFrequency, number> = {
  weekly: 52,
  monthly: 12,
  annual: 1,
}

export function annualiseRent(rent: number, frequency: RentFrequency): number {
  return rent * FREQUENCY_MULTIPLIER[frequency]
}

export function calculateRentalYield({
  propertyPrice,
  rent,
  rentFrequency,
  vacancyRate,
  annualExpenses,
}: RentalYieldInput): RentalYieldResult {
  const annualRent = annualiseRent(rent, rentFrequency)
  const vacancyFactor = 1 - clamp(vacancyRate, 0, 100) / 100
  const effectiveAnnualRent = annualRent * vacancyFactor

  // Avoid divide-by-zero when the price is missing or zero.
  if (propertyPrice <= 0) {
    return { annualRent, effectiveAnnualRent, grossYield: 0, netYield: 0 }
  }

  const grossYield = (annualRent / propertyPrice) * 100
  const netYield = ((effectiveAnnualRent - annualExpenses) / propertyPrice) * 100

  return { annualRent, effectiveAnnualRent, grossYield, netYield }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
