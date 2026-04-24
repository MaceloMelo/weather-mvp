<script setup lang="ts">
import type { CurrentWeatherView } from '../../types/weather'
import { weatherIconUrl } from '../../services/openweather'

defineProps<{
  weather: CurrentWeatherView
}>()
</script>

<template>
  <section
    class="mb-atmos-xl text-center"
    aria-labelledby="weather-hero-title"
  >
    <h1
      id="weather-hero-title"
      class="mb-atmos-xs text-atmos-headline-lg font-semibold tracking-tight text-white"
    >
      {{ weather.locationLabel }}
    </h1>
    <p
      class="mb-atmos-lg text-atmos-label-caps uppercase tracking-widest text-atmos-primary"
    >
      {{ weather.description }}
    </p>
    <div
      class="flex items-center justify-center gap-atmos-lg"
    >
      <div
        class="text-atmos-display-temp font-semibold text-white drop-shadow-2xl"
      >
        {{ Math.round(weather.temperatureC) }}<span class="text-atmos-primary-container">°C</span>
      </div>
      <div class="flex flex-col items-start gap-atmos-xs">
        <img
          class="h-24 w-24 drop-shadow-[0_0_12px_rgb(142_213_255_/_0.5)] sm:h-28 sm:w-28"
          :src="weatherIconUrl(weather.iconCode)"
          alt=""
          width="112"
          height="112"
        >
      </div>
    </div>
  </section>
</template>
