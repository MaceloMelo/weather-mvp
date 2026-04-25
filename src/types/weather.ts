/** Variante de fundo ambiente (Stitch: padrão / chuva / sol / nublado). */
export type AmbientWeatherKind = 'default' | 'rainy' | 'sunny' | 'cloudy'

/** Resposta do endpoint Geocoding 1.0 (trecho usado na UI). */
export interface GeoLocation {
  name: string
  lat: number
  lon: number
  country: string
  state?: string
}

/** Payload exibido no card de tempo atual (derivado da API Current Weather). */
export interface CurrentWeatherView {
  locationLabel: string
  countryCode: string
  temperatureC: number
  feelsLikeC: number
  description: string
  iconCode: string
  humidityPercent: number
  windSpeedMs: number
  pressureHpa: number
  /** Visibilidade em metros (API `visibility`; 0 se ausente). */
  visibilityM: number
  /** Nebulosidade 0–100 (`clouds.all`). */
  cloudinessPercent: number
  /** Pano de fundo da Home alinhado à condição meteorológica (somente camada ambiente). */
  ambientKind: AmbientWeatherKind
}
