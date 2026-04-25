import type { AmbientWeatherKind } from '../types/weather'

/**
 * Deriva o pano de fundo ambiente a partir do `weather[0].id` e do código de ícone OWM.
 * Paridade visual 1:1 com telas Stitch (chuva/sol/nublado/padrão) pode exigir assets em `public/` — ver Human Gate em `docs/micro-tasks/07-weather-ambient-backgrounds.md`.
 */
export function ambientKindFromOwm(
  weatherId: number | undefined,
  iconCode: string,
): AmbientWeatherKind {
  const id = typeof weatherId === 'number' && !Number.isNaN(weatherId) ? weatherId : 0
  const icon = (iconCode || '01d').toLowerCase()

  if (id >= 200 && id < 600) {
    return 'rainy'
  }
  if (id >= 600 && id < 700) {
    return 'default'
  }
  if (id >= 700 && id < 800) {
    return 'cloudy'
  }
  if (id === 800) {
    return icon.endsWith('d') ? 'sunny' : 'default'
  }
  if (id === 801) {
    return 'default'
  }
  if (id >= 802 && id <= 804) {
    return 'cloudy'
  }
  return 'default'
}
