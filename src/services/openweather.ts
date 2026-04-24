import { http } from './http'
import type { CurrentWeatherView, GeoLocation } from '../types/weather'

const GEO_BASE = 'https://api.openweathermap.org/geo/1.0/direct'
const WEATHER_BASE = 'https://api.openweathermap.org/data/2.5/weather'

function getApiKey(): string {
  const key = import.meta.env.VITE_OPENWEATHER_API_KEY
  if (!key || !String(key).trim()) {
    throw new Error(
      'Chave da API ausente. Defina VITE_OPENWEATHER_API_KEY no arquivo .env (veja .env.example).',
    )
  }
  return String(key).trim()
}

export function mapGeoToLocation(raw: Record<string, unknown>): GeoLocation {
  return {
    name: String(raw.name ?? ''),
    lat: Number(raw.lat),
    lon: Number(raw.lon),
    country: String(raw.country ?? ''),
    state: raw.state != null ? String(raw.state) : undefined,
  }
}

interface OwmCurrentResponse {
  weather?: Array<{ description?: string; icon?: string }>
  main?: {
    temp?: number
    feels_like?: number
    humidity?: number
    pressure?: number
  }
  wind?: { speed?: number }
}

export function mapCurrentToView(
  data: OwmCurrentResponse,
  location: GeoLocation,
): CurrentWeatherView {
  const w0 = data.weather && data.weather[0]
  const main = data.main || {}
  const wind = data.wind || {}
  const labelParts = [location.name]
  if (location.state) {
    labelParts.push(location.state)
  }
  labelParts.push(location.country)
  return {
    locationLabel: labelParts.join(', '),
    countryCode: location.country,
    temperatureC: Number(main.temp ?? 0),
    feelsLikeC: Number(main.feels_like ?? main.temp ?? 0),
    description: String(w0?.description ?? ''),
    iconCode: String(w0?.icon ?? '01d'),
    humidityPercent: Number(main.humidity ?? 0),
    windSpeedMs: Number(wind.speed ?? 0),
    pressureHpa: Number(main.pressure ?? 0),
  }
}

export function weatherIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}

export function parseOpenWeatherError(err: unknown): string {
  if (typeof err === 'object' && err !== null && 'isAxiosError' in err) {
    const ax = err as { response?: { status?: number }; message?: string; code?: string }
    const status = ax.response?.status
    if (status === 401) {
      return 'Chave da API inválida ou não autorizada. Verifique VITE_OPENWEATHER_API_KEY.'
    }
    if (status === 404) {
      return 'Recurso não encontrado na API.'
    }
    if (ax.code === 'ECONNABORTED') {
      return 'Tempo de espera da requisição esgotado. Tente novamente.'
    }
    if (ax.message === 'Network Error') {
      return 'Falha de rede. Verifique sua conexão.'
    }
    if (ax.message) {
      return ax.message
    }
  }
  if (err instanceof Error) {
    return err.message
  }
  return 'Erro inesperado ao consultar o tempo.'
}

export async function searchLocations(query: string, limit = 8): Promise<GeoLocation[]> {
  const q = query.trim()
  if (!q) {
    return []
  }
  const appid = getApiKey()
  const { data } = await http.get<unknown[]>(GEO_BASE, {
    params: { q, limit, appid },
  })
  if (!Array.isArray(data)) {
    return []
  }
  return data.map((row) => mapGeoToLocation(row as Record<string, unknown>))
}

export async function getCurrentWeather(
  lat: number,
  lon: number,
  location: GeoLocation,
): Promise<CurrentWeatherView> {
  const appid = getApiKey()
  const { data } = await http.get<OwmCurrentResponse>(WEATHER_BASE, {
    params: {
      lat,
      lon,
      appid,
      units: 'metric',
      lang: 'pt_br',
    },
  })
  return mapCurrentToView(data, location)
}
