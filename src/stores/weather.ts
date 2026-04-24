import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CurrentWeatherView, GeoLocation } from '../types/weather'
import {
  getCurrentWeather,
  parseOpenWeatherError,
  searchLocations,
} from '../services/openweather'

/** Texto inicial da busca e fallback de cidade padrão (Aracaju, Sergipe, Brasil). */
export const DEFAULT_CITY_SEARCH_QUERY = 'Aracaju, Sergipe, BR'

export const useWeatherStore = defineStore('weather', () => {
  const searchQuery = ref(DEFAULT_CITY_SEARCH_QUERY)
  const noGeocodeMatch = ref(false)
  const selected = ref<GeoLocation | null>(null)
  const current = ref<CurrentWeatherView | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  function clearLists() {
    noGeocodeMatch.value = false
    selected.value = null
    current.value = null
  }

  async function searchByQuery() {
    error.value = null
    const q = searchQuery.value.trim()
    if (!q) {
      clearLists()
      return
    }
    loading.value = true
    noGeocodeMatch.value = false
    try {
      const list = await searchLocations(q)
      selected.value = null
      current.value = null
      if (list.length === 0) {
        noGeocodeMatch.value = true
        error.value = null
        return
      }
      await selectLocation(list[0])
    } catch (e) {
      noGeocodeMatch.value = false
      selected.value = null
      current.value = null
      error.value = parseOpenWeatherError(e)
    } finally {
      loading.value = false
    }
  }

  async function selectLocation(loc: GeoLocation) {
    error.value = null
    selected.value = loc
    loading.value = true
    try {
      current.value = await getCurrentWeather(loc.lat, loc.lon, loc)
    } catch (e) {
      current.value = null
      error.value = parseOpenWeatherError(e)
    } finally {
      loading.value = false
    }
  }

  return {
    searchQuery,
    noGeocodeMatch,
    selected,
    current,
    loading,
    error,
    searchByQuery,
    selectLocation,
  }
})
