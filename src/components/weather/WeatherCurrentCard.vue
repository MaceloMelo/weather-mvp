<script setup lang="ts">
import type { CurrentWeatherView } from '../../types/weather'
import { weatherIconUrl } from '../../services/openweather'

defineProps<{
  weather: CurrentWeatherView
}>()
</script>

<template>
  <article
    class="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-sky-50 to-white shadow-md"
    aria-live="polite"
  >
    <div class="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-xl font-semibold text-slate-900">
          {{ weather.locationLabel }}
        </h2>
        <p class="mt-1 capitalize text-slate-600">
          {{ weather.description }}
        </p>
        <dl class="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-700 sm:grid-cols-3">
          <div>
            <dt class="text-slate-500">
              Umidade
            </dt>
            <dd class="font-medium">
              {{ weather.humidityPercent }}%
            </dd>
          </div>
          <div>
            <dt class="text-slate-500">
              Vento
            </dt>
            <dd class="font-medium">
              {{ weather.windSpeedMs.toFixed(1) }} m/s
            </dd>
          </div>
          <div>
            <dt class="text-slate-500">
              Pressão
            </dt>
            <dd class="font-medium">
              {{ weather.pressureHpa }} hPa
            </dd>
          </div>
        </dl>
      </div>
      <div class="flex flex-col items-center sm:items-end">
        <img
          class="h-24 w-24"
          :src="weatherIconUrl(weather.iconCode)"
          alt=""
          width="96"
          height="96"
        >
        <p class="mt-2 text-4xl font-bold tracking-tight text-slate-900">
          {{ Math.round(weather.temperatureC) }}°C
        </p>
        <p class="text-sm text-slate-600">
          Sensação {{ Math.round(weather.feelsLikeC) }}°C
        </p>
      </div>
    </div>
  </article>
</template>
