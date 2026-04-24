<script setup lang="ts">
/**
 * @deprecated Layout principal da Home migrado para Stitch PT-BR: use
 * `WeatherHeroSection`, `WeatherBentoMetrics` e `WeatherSecondaryMetricsRow`.
 * Mantido para referência ou telas que ainda dependam do cartão único.
 */
import type { CurrentWeatherView } from '../../types/weather'
import { weatherIconUrl } from '../../services/openweather'
import DsGlassCard from '../ds/DsGlassCard.vue'

defineProps<{
  weather: CurrentWeatherView
}>()
</script>

<template>
  <article
    class="w-full max-w-2xl"
    aria-live="polite"
  >
    <DsGlassCard class="overflow-hidden">
      <div class="flex flex-col gap-atmos-md p-atmos-md sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 class="text-atmos-headline-md text-atmos-onSurface">
            {{ weather.locationLabel }}
          </h2>
          <p class="mt-atmos-xs text-atmos-body-lg capitalize text-atmos-onSurfaceVariant">
            {{ weather.description }}
          </p>
          <dl class="mt-atmos-md grid grid-cols-2 gap-x-atmos-lg gap-y-atmos-sm text-atmos-body-md text-atmos-onSurface sm:grid-cols-3">
            <div>
              <dt class="text-atmos-onSurfaceVariant">
                Umidade
              </dt>
              <dd class="font-medium">
                {{ weather.humidityPercent }}%
              </dd>
            </div>
            <div>
              <dt class="text-atmos-onSurfaceVariant">
                Vento
              </dt>
              <dd class="font-medium">
                {{ weather.windSpeedMs.toFixed(1) }} m/s
              </dd>
            </div>
            <div>
              <dt class="text-atmos-onSurfaceVariant">
                Pressão
              </dt>
              <dd class="font-medium">
                {{ weather.pressureHpa }} hPa
              </dd>
            </div>
            <div>
              <dt class="text-atmos-onSurfaceVariant">
                Visibilidade
              </dt>
              <dd class="font-medium">
                <template v-if="weather.visibilityM >= 1000">
                  {{ (weather.visibilityM / 1000).toFixed(1) }} km
                </template>
                <template v-else-if="weather.visibilityM > 0">
                  {{ Math.round(weather.visibilityM) }} m
                </template>
                <template v-else>
                  —
                </template>
              </dd>
            </div>
            <div>
              <dt class="text-atmos-onSurfaceVariant">
                Nebulosidade
              </dt>
              <dd class="font-medium">
                {{ weather.cloudinessPercent }}%
              </dd>
            </div>
          </dl>
        </div>
        <div class="flex flex-col items-center sm:items-end">
          <img
            class="h-24 w-24 drop-shadow-[0_0_12px_rgb(142_213_255_/_0.35)]"
            :src="weatherIconUrl(weather.iconCode)"
            alt=""
            width="96"
            height="96"
          >
          <p class="mt-atmos-sm text-atmos-display-temp text-atmos-primary">
            {{ Math.round(weather.temperatureC) }}°C
          </p>
          <p class="text-atmos-body-md text-atmos-onSurfaceVariant">
            Sensação {{ Math.round(weather.feelsLikeC) }}°C
          </p>
        </div>
      </div>
    </DsGlassCard>
  </article>
</template>
