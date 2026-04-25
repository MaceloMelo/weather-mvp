import { vi } from 'vitest'
import * as openweatherService from '../../src/services/openweather'

export function mockSearchLocationsOnce(data: Awaited<ReturnType<typeof openweatherService.searchLocations>>) {
  return vi.spyOn(openweatherService, 'searchLocations').mockResolvedValueOnce(data)
}

export function mockGetCurrentWeatherOnce(
  data: Awaited<ReturnType<typeof openweatherService.getCurrentWeather>>,
) {
  return vi.spyOn(openweatherService, 'getCurrentWeather').mockResolvedValueOnce(data)
}
