import type { CurrentWeatherView, GeoLocation } from '../../src/types/weather'

export const baseGeoLocation: GeoLocation = {
  name: 'Aracaju',
  lat: -10.9111,
  lon: -37.0717,
  country: 'BR',
  state: 'Sergipe',
}

export const baseCurrentWeatherView: CurrentWeatherView = {
  locationLabel: 'Aracaju, Sergipe, BR',
  countryCode: 'BR',
  temperatureC: 27.4,
  feelsLikeC: 29.1,
  description: 'céu limpo',
  iconCode: '01d',
  humidityPercent: 62,
  windSpeedMs: 4.2,
  pressureHpa: 1012,
  visibilityM: 10000,
  cloudinessPercent: 0,
  ambientKind: 'sunny',
}

export function buildGeoLocation(overrides: Partial<GeoLocation> = {}): GeoLocation {
  return {
    ...baseGeoLocation,
    ...overrides,
  }
}

export function buildCurrentWeatherView(
  overrides: Partial<CurrentWeatherView> = {},
): CurrentWeatherView {
  return {
    ...baseCurrentWeatherView,
    ...overrides,
  }
}
