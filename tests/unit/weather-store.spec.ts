import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { DEFAULT_CITY_SEARCH_QUERY, useWeatherStore } from '../../src/stores/weather'
import { buildCurrentWeatherView, buildGeoLocation } from '../fixtures/weather'
import * as openweatherService from '../../src/services/openweather'

vi.mock('../../src/services/openweather', async () => {
  const actual = await vi.importActual<typeof import('../../src/services/openweather')>(
    '../../src/services/openweather',
  )
  return {
    ...actual,
    searchLocations: vi.fn(),
    getCurrentWeather: vi.fn(),
    parseOpenWeatherError: vi.fn(),
  }
})

const mockedSearchLocations = vi.mocked(openweatherService.searchLocations)
const mockedGetCurrentWeather = vi.mocked(openweatherService.getCurrentWeather)
const mockedParseOpenWeatherError = vi.mocked(openweatherService.parseOpenWeatherError)

describe('useWeatherStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    mockedParseOpenWeatherError.mockReturnValue('Erro amigável')
  })

  it('starts with expected default contract values', () => {
    const store = useWeatherStore()

    expect(store.searchQuery).toBe(DEFAULT_CITY_SEARCH_QUERY)
    expect(store.noGeocodeMatch).toBe(false)
    expect(store.selected).toBeNull()
    expect(store.current).toBeNull()
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('clears state and avoids API call for blank query (red path)', async () => {
    const store = useWeatherStore()
    store.searchQuery = '   '
    store.noGeocodeMatch = true
    store.selected = buildGeoLocation()
    store.current = buildCurrentWeatherView()

    await store.searchByQuery()

    expect(mockedSearchLocations).not.toHaveBeenCalled()
    expect(store.noGeocodeMatch).toBe(false)
    expect(store.selected).toBeNull()
    expect(store.current).toBeNull()
  })

  it('sets noGeocodeMatch when location list is empty (red path)', async () => {
    const store = useWeatherStore()
    store.searchQuery = 'Atlantis'
    mockedSearchLocations.mockResolvedValueOnce([])

    await store.searchByQuery()

    expect(store.noGeocodeMatch).toBe(true)
    expect(store.selected).toBeNull()
    expect(store.current).toBeNull()
    expect(store.error).toBeNull()
    expect(store.loading).toBe(false)
  })

  it('loads first location and current weather when search succeeds (green path)', async () => {
    const store = useWeatherStore()
    const location = buildGeoLocation()
    const weather = buildCurrentWeatherView()
    store.searchQuery = 'Aracaju'
    mockedSearchLocations.mockResolvedValueOnce([location])
    mockedGetCurrentWeather.mockResolvedValueOnce(weather)

    await store.searchByQuery()

    expect(mockedSearchLocations).toHaveBeenCalledWith('Aracaju')
    expect(mockedGetCurrentWeather).toHaveBeenCalledWith(location.lat, location.lon, location)
    expect(store.selected).toEqual(location)
    expect(store.current).toEqual(weather)
    expect(store.noGeocodeMatch).toBe(false)
    expect(store.error).toBeNull()
    expect(store.loading).toBe(false)
  })

  it('sets user-facing error when search throws (red path)', async () => {
    const store = useWeatherStore()
    const apiError = new Error('api down')
    store.searchQuery = 'Aracaju'
    mockedSearchLocations.mockRejectedValueOnce(apiError)

    await store.searchByQuery()

    expect(mockedParseOpenWeatherError).toHaveBeenCalledWith(apiError)
    expect(store.selected).toBeNull()
    expect(store.current).toBeNull()
    expect(store.noGeocodeMatch).toBe(false)
    expect(store.error).toBe('Erro amigável')
    expect(store.loading).toBe(false)
  })

  it('keeps selected location and clears current weather on select failure (red path)', async () => {
    const store = useWeatherStore()
    const location = buildGeoLocation({ name: 'Maceio' })
    const apiError = new Error('timeout')
    mockedGetCurrentWeather.mockRejectedValueOnce(apiError)

    await store.selectLocation(location)

    expect(store.selected).toEqual(location)
    expect(store.current).toBeNull()
    expect(store.error).toBe('Erro amigável')
    expect(store.loading).toBe(false)
  })
})
