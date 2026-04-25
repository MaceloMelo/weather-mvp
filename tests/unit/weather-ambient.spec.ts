import { describe, expect, it } from 'vitest'
import { ambientKindFromOwm } from '../../src/lib/weatherAmbient'

describe('ambientKindFromOwm', () => {
  it('returns rainy for thunderstorm and rain ranges', () => {
    expect(ambientKindFromOwm(200, '11d')).toBe('rainy')
    expect(ambientKindFromOwm(599, '10n')).toBe('rainy')
  })

  it('returns sunny only for clear day', () => {
    expect(ambientKindFromOwm(800, '01d')).toBe('sunny')
    expect(ambientKindFromOwm(800, '01n')).toBe('default')
  })

  it('returns cloudy for atmosphere and dense clouds', () => {
    expect(ambientKindFromOwm(741, '50d')).toBe('cloudy')
    expect(ambientKindFromOwm(803, '04d')).toBe('cloudy')
  })

  it('falls back to default for unknown or invalid values', () => {
    expect(ambientKindFromOwm(undefined, '')).toBe('default')
    expect(ambientKindFromOwm(Number.NaN, 'invalid')).toBe('default')
  })
})
