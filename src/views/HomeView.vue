<script setup lang="ts">
import { storeToRefs } from 'pinia'
import WeatherSearchBar from '../components/weather/WeatherSearchBar.vue'
import LocationResultsList from '../components/weather/LocationResultsList.vue'
import WeatherCurrentCard from '../components/weather/WeatherCurrentCard.vue'
import { useWeatherStore } from '../stores/weather'

const store = useWeatherStore()
const { searchQuery, results, current, loading, error } = storeToRefs(store)

function onUpdateQuery(value: string) {
  store.searchQuery = value
}
</script>

<template>
  <div class="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-4 py-10">
    <header class="text-center">
      <h1 class="text-3xl font-bold text-slate-900 sm:text-4xl">
        Previsão do tempo
      </h1>
      <p class="mt-2 max-w-xl text-slate-600">
        Pesquise por cidade, estado (UF) ou país. Exemplos:
        <span class="font-medium text-slate-800">Curitiba, BR</span>,
        <span class="font-medium text-slate-800">Porto Alegre, RS, BR</span>.
      </p>
    </header>

    <WeatherSearchBar
      :model-value="searchQuery"
      :disabled="loading"
      @update:model-value="onUpdateQuery"
      @search="store.searchByQuery"
    />

    <p
      v-if="loading"
      class="text-sm font-medium text-sky-700"
      role="status"
      aria-live="polite"
    >
      Carregando…
    </p>

    <p
      v-if="error"
      class="w-full max-w-2xl rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-left text-sm text-red-800"
      role="alert"
    >
      {{ error }}
    </p>

    <p
      v-if="!loading && !error && searchQuery.trim() && results.length === 0"
      class="text-center text-sm text-slate-600"
    >
      Nenhum local encontrado para “{{ searchQuery.trim() }}”. Tente outro termo.
    </p>

    <LocationResultsList
      :items="results"
      @select="store.selectLocation"
    />

    <WeatherCurrentCard
      v-if="current"
      :weather="current"
    />
  </div>
</template>
