<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import DsAmbientBackground from '../components/ds/DsAmbientBackground.vue'
import DsBottomNav from '../components/ds/DsBottomNav.vue'
import DsTopAppBar from '../components/ds/DsTopAppBar.vue'
import WeatherBentoMetrics from '../components/weather/WeatherBentoMetrics.vue'
import WeatherForecastStrip from '../components/weather/WeatherForecastStrip.vue'
import WeatherHeroSection from '../components/weather/WeatherHeroSection.vue'
import WeatherSearchBar from '../components/weather/WeatherSearchBar.vue'
import WeatherSecondaryMetricsRow from '../components/weather/WeatherSecondaryMetricsRow.vue'
import { useWeatherStore } from '../stores/weather'

const store = useWeatherStore()
const { searchQuery, current, loading, error, noGeocodeMatch } = storeToRefs(store)

function onUpdateQuery(value: string) {
  store.searchQuery = value
}

onMounted(() => {
  void store.searchByQuery()
})
</script>

<template>
  <div class="relative min-h-screen overflow-x-hidden text-atmos-onBackground">
    <DsAmbientBackground />

    <DsTopAppBar brand="Atmos">
      <template #nav>
        <button
          type="button"
          class="font-semibold text-atmos-primary transition hover:text-atmos-primary-container"
        >
          Início
        </button>
        <button
          type="button"
          class="text-white/70 transition hover:text-white"
        >
          Previsão
        </button>
        <button
          type="button"
          class="text-white/70 transition hover:text-white"
        >
          Radar
        </button>
      </template>
    </DsTopAppBar>

    <main
      class="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center px-atmos-container-margin pb-40 pt-28 md:pt-32"
    >
      <WeatherSearchBar
        :model-value="searchQuery"
        :disabled="loading"
        @update:model-value="onUpdateQuery"
        @search="store.searchByQuery"
      />

      <p
        v-if="loading"
        class="mb-atmos-md text-atmos-body-md font-medium text-atmos-primary"
        role="status"
        aria-live="polite"
      >
        Carregando…
      </p>

      <p
        v-if="error"
        class="mb-atmos-md w-full max-w-2xl rounded-atmos-md border border-atmos-error/40 bg-atmos-errorContainer/30 px-atmos-md py-atmos-sm text-left text-atmos-body-md text-atmos-onErrorContainer"
        role="alert"
      >
        {{ error }}
      </p>

      <p
        v-if="!loading && !error && searchQuery.trim() && noGeocodeMatch"
        class="mb-atmos-md text-center text-atmos-body-md text-atmos-onSurfaceVariant"
      >
        Nenhum local encontrado para “{{ searchQuery.trim() }}”. Tente outro termo.
      </p>

      <template v-if="current">
        <div
          class="mt-atmos-xl flex w-full max-w-5xl flex-col items-center"
        >
          <WeatherHeroSection :weather="current" />
          <WeatherBentoMetrics :weather="current" />
          <WeatherSecondaryMetricsRow :weather="current" />
          <WeatherForecastStrip />
        </div>
      </template>
    </main>

    <DsBottomNav active-id="home" />
  </div>
</template>
