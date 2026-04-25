import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import HomeView from '../../src/views/HomeView.vue'
import { buildCurrentWeatherView } from '../fixtures/weather'

const state = {
  searchQuery: ref('Aracaju, Sergipe, BR'),
  current: ref<ReturnType<typeof buildCurrentWeatherView> | null>(null),
  loading: ref(false),
  error: ref<string | null>(null),
  noGeocodeMatch: ref(false),
}

const searchByQueryMock = vi.fn(async () => undefined)
const storeMock = {
  ...state,
  searchByQuery: searchByQueryMock,
}

vi.mock('../../src/stores/weather', () => ({
  useWeatherStore: () => storeMock,
}))

function mountHomeView() {
  return mount(HomeView, {
    global: {
      stubs: {
        DsAmbientBackground: { template: '<div data-testid="ambient" />' },
        DsBottomNav: { template: '<div data-testid="bottom-nav" />' },
        DsTopAppBar: { template: '<div><slot name="nav" /></div>' },
        WeatherSearchBar: {
          template: '<button data-testid="search-bar" @click="$emit(\'search\')" />',
          props: ['modelValue', 'disabled'],
          emits: ['search', 'update:modelValue'],
        },
        WeatherHeroSection: { template: '<div data-testid="hero" />' },
        WeatherBentoMetrics: { template: '<div data-testid="bento" />' },
        WeatherSecondaryMetricsRow: { template: '<div data-testid="secondary" />' },
        WeatherForecastStrip: { template: '<div data-testid="forecast" />' },
      },
    },
  })
}

describe('HomeView', () => {
  beforeEach(() => {
    state.searchQuery.value = 'Aracaju, Sergipe, BR'
    state.current.value = null
    state.loading.value = false
    state.error.value = null
    state.noGeocodeMatch.value = false
    searchByQueryMock.mockClear()
  })

  it('calls searchByQuery on mount and on search action', async () => {
    const wrapper = mountHomeView()
    await Promise.resolve()

    expect(searchByQueryMock).toHaveBeenCalledTimes(1)
    await wrapper.get('[data-testid="search-bar"]').trigger('click')
    expect(searchByQueryMock).toHaveBeenCalledTimes(2)
  })

  it('renders loading feedback when request is in progress', () => {
    state.loading.value = true
    const wrapper = mountHomeView()

    expect(wrapper.text()).toContain('Carregando…')
  })

  it('renders API error message when error exists (red path)', () => {
    state.error.value = 'Falha de rede'
    const wrapper = mountHomeView()

    expect(wrapper.text()).toContain('Falha de rede')
  })

  it('renders no-result message when geocode has no matches (red path)', () => {
    state.searchQuery.value = 'Cidade inexistente'
    state.noGeocodeMatch.value = true
    const wrapper = mountHomeView()

    expect(wrapper.text()).toContain('Nenhum local encontrado')
  })

  it('renders weather sections when current weather is available (green path)', () => {
    state.current.value = buildCurrentWeatherView()
    const wrapper = mountHomeView()

    expect(wrapper.find('[data-testid="hero"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="bento"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="secondary"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="forecast"]').exists()).toBe(true)
  })
})
