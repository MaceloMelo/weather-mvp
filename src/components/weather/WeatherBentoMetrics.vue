<script setup lang="ts">
import type { CurrentWeatherView } from '../../types/weather'
import WeatherMetricTile from './WeatherMetricTile.vue'

defineProps<{
  weather: CurrentWeatherView
}>()
</script>

<template>
  <section
    class="mb-atmos-xl grid w-full grid-cols-1 gap-atmos-lg md:grid-cols-3"
    aria-label="Indicadores principais"
  >
    <WeatherMetricTile
      icon="humidity_percentage"
      icon-tone="primary"
      label="Umidade"
      :value="`${weather.humidityPercent}%`"
    />
    <WeatherMetricTile
      icon="air"
      icon-tone="secondary"
      label="Velocidade do vento"
      :value="`${weather.windSpeedMs.toFixed(1)} m/s`"
    />
    <WeatherMetricTile
      icon="cloud"
      icon-tone="tertiary"
      label="Nebulosidade"
      :value="`${weather.cloudinessPercent}%`"
    />
  </section>
</template>
