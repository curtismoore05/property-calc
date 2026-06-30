// State/territory land tax, ported from realestatecalculators.com.au.
// Rates are estimates and change frequently — confirm with the relevant
// state revenue office. NT has no general land tax.

import type { StateCode } from './stampDuty'

export type OwnerType = 'Individual' | 'Company or Trust'

export interface LandTaxInput {
  state: StateCode
  landValue: number
  ownerType: OwnerType
  vicAbsentee: boolean
}

export interface LandTaxResult {
  tax: number
  threshold: number
  marginalRate: number
}

export function calculateLandTax(input: LandTaxInput): LandTaxResult | null {
  const d = input.landValue
  if (d <= 0) return null
  const { state, ownerType, vicAbsentee } = input

  let h = 0
  let g = 0
  let y = 0

  switch (state) {
    case 'VIC': {
      g = 50_000
      if (d >= 50_000 && d < 300_000) { h = 135 + (d - 50_000) * 0.002; y = 0.2 }
      else if (d < 600_000) { h = 135 + (d - 300_000) * 0.002; y = 0.2 }
      else if (d < 1_000_000) { h = 1_135 + (d - 600_000) * 0.005; y = 0.5 }
      else if (d < 1_800_000) { h = 3_135 + (d - 1_000_000) * 0.008; y = 0.8 }
      else if (d < 3_000_000) { h = 9_535 + (d - 1_800_000) * 0.013; y = 1.3 }
      else { h = 25_135 + (d - 3_000_000) * 0.0225; y = 2.25 }
      if (vicAbsentee) { h += d * 0.04; y += 4 }
      if (ownerType === 'Company or Trust') h *= 1.2
      break
    }
    case 'NSW': {
      g = 1_075_000
      if (d >= g && d < 6_571_000) { h = 100 + (d - g) * 0.016; y = 1.6 }
      else if (d >= 6_571_000) { h = 88_036 + (d - 6_571_000) * 0.02; y = 2 }
      break
    }
    case 'QLD': {
      g = 600_000
      if (ownerType === 'Company or Trust') g = 350_000
      if (d >= g && d < 1_000_000) { h = 500 + (d - g) * 0.01; y = 1 }
      else if (d >= 1_000_000) { h = 4_500 + (d - 1_000_000) * 0.0165; y = 1.65 }
      break
    }
    case 'SA': {
      g = 534_000
      if (d >= g && d < 801_000) { h = (d - g) * 0.005; y = 0.5 }
      else if (d >= 801_000 && d < 1_068_000) { h = 1_335 + (d - 801_000) * 0.0125; y = 1.25 }
      else if (d >= 1_068_000) { h = 4_672.5 + (d - 1_068_000) * 0.02; y = 2 }
      break
    }
    case 'WA': {
      g = 300_000
      if (d >= g && d < 420_000) { h = 300 + (d - g) * 0.0025; y = 0.25 }
      else if (d >= 420_000 && d < 1_000_000) { h = 600 + (d - 420_000) * 0.009; y = 0.9 }
      else if (d >= 1_000_000) { h = 5_820 + (d - 1_000_000) * 0.018; y = 1.8 }
      break
    }
    case 'TAS': {
      g = 100_000
      if (d >= g && d < 500_000) { h = 50 + (d - g) * 0.0055; y = 0.55 }
      else if (d >= 500_000) { h = 2_250 + (d - 500_000) * 0.015; y = 1.5 }
      break
    }
    case 'ACT': {
      g = 0
      if (d > 0 && d <= 150_000) { h = 1_462 + d * 0.005; y = 0.5 }
      else if (d <= 275_000) { h = 2_212 + (d - 150_000) * 0.006; y = 0.6 }
      else if (d > 275_000) { h = 2_962 + (d - 275_000) * 0.0108; y = 1.08 }
      break
    }
    case 'NT': {
      g = 0; h = 0; y = 0
      break
    }
  }

  return { tax: Math.max(0, h), threshold: g, marginalRate: y }
}
