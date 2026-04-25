import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { GeoLocation } from '../../src/types/weather'
import {
  getCurrentWeather,
  mapCurrentToView,
  mapGeoToLocation,
  parseOpenWeatherError,
  searchLocations,
  weatherIconUrl,
} from '../../src/services/openweather'

const { httpGetMock } = vi.hoisted(() => ({
  httpGetMock: vi.fn(),
}))

vi.mock('../../src/services/http', () => ({
  http: {
    get: httpGetMock,
  },
}))

describe('openweather service helpers', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_OPENWEATHER_API_KEY', 'test-key')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.clearAllMocks()
  })

  it('maps geocoding payload into GeoLocation', () => {
    expect(
      mapGeoToLocation({
        name: 'Aracaju',
        lat: -10.9,
        lon: -37.1,
        country: 'BR',
        state: 'SE',
      }),
    ).toEqual({
      name: 'Aracaju',
      lat: -10.9,
      lon: -37.1,
      country: 'BR',
      state: 'SE',
    })
  })

  it('maps current weather payload into CurrentWeatherView', () => {
    const location: GeoLocation = {
      name: 'Aracaju',
      lat: -10.9,
      lon: -37.1,
      country: 'BR',
      state: 'SE',
    }

    const view = mapCurrentToView(
      {
        weather: [{ id: 800, description: 'céu limpo', icon: '01d' }],
        main: { temp: 30, feels_like: 31, humidity: 55, pressure: 1010 },
        wind: { speed: 4.4 },
        visibility: 10000,
        clouds: { all: 0 },
      },
      location,
    )

    expect(view.locationLabel).toBe('Aracaju, SE, BR')
    expect(view.ambientKind).toBe('sunny')
    expect(view.windSpeedMs).toBe(4.4)
  })

  it('parses axios-like errors into user messages', () => {
    expect(
      parseOpenWeatherError({
        isAxiosError: true,
        response: { status: 401 },
      }),
    ).toContain('Chave da API inválida')

    expect(
      parseOpenWeatherError({
        isAxiosError: true,
        code: 'ECONNABORTED',
      }),
    ).toContain('Tempo de espera')
  })

  it('builds icon url correctly', () => {
    expect(weatherIconUrl('10n')).toBe('https://openweathermap.org/img/wn/10n@2x.png')
  })

  it('returns [] for blank search query (red path)', async () => {
    const list = await searchLocations('   ')
    expect(list).toEqual([])
    expect(httpGetMock).not.toHaveBeenCalled()
  })

  it('calls geocoding endpoint and maps response (green path)', async () => {
    httpGetMock.mockResolvedValueOnce({
      data: [{ name: 'Aracaju', lat: -10.9, lon: -37.1, country: 'BR' }],
    })

    const list = await searchLocations('Aracaju')

    expect(httpGetMock).toHaveBeenCalledWith(
      'https://api.openweathermap.org/geo/1.0/direct',
      {
        params: { q: 'Aracaju', limit: 8, appid: 'test-key' },
      },
    )
    expect(list[0]).toMatchObject({
      name: 'Aracaju',
      country: 'BR',
    })
  })

  it('fetches current weather and maps result (green path)', async () => {
    httpGetMock.mockResolvedValueOnce({
      data: {
        weather: [{ id: 501, description: 'chuva moderada', icon: '10d' }],
        main: { temp: 25, feels_like: 26, humidity: 90, pressure: 1009 },
        wind: { speed: 3 },
        visibility: 6000,
        clouds: { all: 90 },
      },
    })

    const location: GeoLocation = {
      name: 'Recife',
      lat: -8.05,
      lon: -34.9,
      country: 'BR',
    }
    const result = await getCurrentWeather(location.lat, location.lon, location)

    expect(httpGetMock).toHaveBeenCalledWith(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          lat: -8.05,
          lon: -34.9,
          appid: 'test-key',
          units: 'metric',
          lang: 'pt_br',
        },
      },
    )
    expect(result.locationLabel).toBe('Recife, BR')
    expect(result.ambientKind).toBe('rainy')
  })

  it('returns [] when geocoding response is not an array (red path)', async () => {
    httpGetMock.mockResolvedValueOnce({
      data: { cod: 400 },
    })

    await expect(searchLocations('Aracaju')).resolves.toEqual([])
  })
})
