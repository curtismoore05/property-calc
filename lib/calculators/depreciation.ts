// Property depreciation estimate, ported from realestatecalculators.com.au.
// Combines a building (Division 43) and plant & equipment (Division 40) rate
// that taper with the property's age, then declines ~10%/year over 5 years.

export type DwellingType = 'House' | 'Apartment' | 'Townhouse'

const CURRENT_YEAR = 2026

export interface DepreciationInput {
  propertyType: DwellingType
  yearBuilt: number
  purchasePrice: number
}

export interface DepreciationYear {
  year: number
  depreciation: number
}

export interface DepreciationResult {
  year1Depreciation: number
  schedule: DepreciationYear[]
}

export function calculateDepreciation(input: DepreciationInput): DepreciationResult | null {
  const { propertyType, yearBuilt, purchasePrice: price } = input
  if (!yearBuilt || price <= 0) return null

  const age = CURRENT_YEAR - yearBuilt
  let building: number
  let plant: number
  if (age < 5) {
    building = 0.025; plant = 0.025
  } else if (age < 10) {
    building = 0.018; plant = 0.02
  } else if (age < 20) {
    building = 0.012; plant = 0.015
  } else {
    building = 0.008; plant = 0.01
  }

  if (propertyType === 'Apartment') building *= 1.2
  else if (propertyType === 'House') building *= 0.9

  const rate = building + plant
  const year1Depreciation = price * rate

  const schedule: DepreciationYear[] = []
  for (let y = 1; y <= 5; y++) {
    schedule.push({ year: y, depreciation: price * rate * Math.pow(0.9, y - 1) })
  }

  return { year1Depreciation, schedule }
}
