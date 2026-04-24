import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CurrentWeatherView, GeoLocation } from '../types/weather'
import {
  getCurrentWeather,
  parseOpenWeatherError,
  searchLocations,
} from '../services/openweather'

export const useWeatherStore = defineStore('weather', () => {
  const searchQuery = ref('')
  const results = ref<GeoLocation[]>([])
  const selected = ref<GeoLocation | null>(null)
  const current = ref<CurrentWeatherView | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  function clearLists() {
    results.value = []
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
    try {
      const list = await searchLocations(q)
      results.value = list
      selected.value = null
      current.value = null
      if (list.length === 0) {
        error.value = null
      }
    } catch (e) {
      results.value = []
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
    results,
    selected,
    current,
    loading,
    error,
    searchByQuery,
    selectLocation,
  }
})
