<script setup lang="ts">
import type { CurrentWeatherView } from '../../types/weather'
import DsGlassCard from '../ds/DsGlassCard.vue'

const props = defineProps<{
  weather: CurrentWeatherView
}>()

function formatVisibility(): string {
  const m = props.weather.visibilityM
  if (!m || m <= 0) {
    return '—'
  }
  if (m >= 1000) {
    return `${(m / 1000).toFixed(1)} km`
  }
  return `${Math.round(m)} m`
}
</script>

<template>
  <section
    class="mb-atmos-xl w-full"
    aria-label="Visibilidade, sensação térmica e pressão"
  >
    <DsGlassCard class="relative overflow-hidden rounded-[32px] p-atmos-lg">
      <div
        class="flex flex-col items-stretch justify-between gap-atmos-lg md:flex-row md:items-center"
      >
        <div class="flex items-center gap-atmos-md">
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-atmos-primary/20"
          >
            <span
              class="material-symbols-outlined text-atmos-primary"
              aria-hidden="true"
            >visibility</span>
          </div>
          <div>
            <p class="text-atmos-label-caps uppercase text-white/50">
              Visibilidade
            </p>
            <p class="text-atmos-body-lg font-semibold text-white">
              {{ formatVisibility() }}
            </p>
          </div>
        </div>

        <div
          class="h-px w-full bg-white/10 md:h-12 md:w-px"
          aria-hidden="true"
        />

        <div class="flex items-center gap-atmos-md">
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-atmos-secondary/20"
          >
            <span
              class="material-symbols-outlined text-atmos-secondary"
              aria-hidden="true"
            >thermostat</span>
          </div>
          <div>
            <p class="text-atmos-label-caps uppercase text-white/50">
              Sensação térmica
            </p>
            <p class="text-atmos-body-lg font-semibold text-white">
              {{ Math.round(props.weather.feelsLikeC) }}°C
            </p>
          </div>
        </div>

        <div
          class="h-px w-full bg-white/10 md:h-12 md:w-px"
          aria-hidden="true"
        />

        <div class="flex items-center gap-atmos-md">
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-atmos-tertiary/20"
          >
            <span
              class="material-symbols-outlined text-atmos-tertiary"
              aria-hidden="true"
            >compress</span>
          </div>
          <div>
            <p class="text-atmos-label-caps uppercase text-white/50">
              Pressão
            </p>
            <p class="text-atmos-body-lg font-semibold text-white">
              {{ props.weather.pressureHpa }} hPa
            </p>
          </div>
        </div>
      </div>
    </DsGlassCard>
  </section>
</template>
