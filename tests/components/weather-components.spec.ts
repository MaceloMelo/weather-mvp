import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import WeatherBentoMetrics from '../../src/components/weather/WeatherBentoMetrics.vue'
import WeatherCurrentCard from '../../src/components/weather/WeatherCurrentCard.vue'
import WeatherForecastStrip from '../../src/components/weather/WeatherForecastStrip.vue'
import WeatherHeroSection from '../../src/components/weather/WeatherHeroSection.vue'
import WeatherMetricTile from '../../src/components/weather/WeatherMetricTile.vue'
import WeatherSearchBar from '../../src/components/weather/WeatherSearchBar.vue'
import WeatherSecondaryMetricsRow from '../../src/components/weather/WeatherSecondaryMetricsRow.vue'
import { buildCurrentWeatherView } from '../fixtures/weather'

describe('weather components', () => {
  it('WeatherSearchBar emits query updates and search event', async () => {
    const wrapper = mount(WeatherSearchBar, {
      props: {
        modelValue: '',
        disabled: false,
      },
    })

    const input = wrapper.get('input[type="search"]')
    await input.setValue('Recife, BR')
    await wrapper.get('form').trigger('submit.prevent')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Recife, BR'])
    expect(wrapper.emitted('search')).toHaveLength(1)
  })

  it('WeatherMetricTile shows tone class and main fields', () => {
    const wrapper = mount(WeatherMetricTile, {
      props: {
        icon: 'air',
        iconTone: 'secondary',
        label: 'Vento',
        value: '3.5 m/s',
      },
    })

    expect(wrapper.text()).toContain('Vento')
    expect(wrapper.text()).toContain('3.5 m/s')
    expect(wrapper.find('.text-atmos-secondary').exists()).toBe(true)
  })

  it('WeatherHeroSection renders location, description and icon url', () => {
    const weather = buildCurrentWeatherView({
      iconCode: '10d',
      locationLabel: 'Recife, PE, BR',
    })
    const wrapper = mount(WeatherHeroSection, {
      props: { weather },
    })

    expect(wrapper.text()).toContain('Recife, PE, BR')
    expect(wrapper.text()).toContain('céu limpo')
    expect(wrapper.get('img').attributes('src')).toContain('/10d@2x.png')
  })

  it('WeatherBentoMetrics formats humidity, wind and cloudiness metrics', () => {
    const weather = buildCurrentWeatherView({
      humidityPercent: 80,
      windSpeedMs: 4.16,
      cloudinessPercent: 65,
    })
    const wrapper = mount(WeatherBentoMetrics, {
      props: { weather },
    })

    expect(wrapper.text()).toContain('80%')
    expect(wrapper.text()).toContain('4.2 m/s')
    expect(wrapper.text()).toContain('65%')
  })

  it('WeatherSecondaryMetricsRow formats visibility cases', () => {
    const kmWrapper = mount(WeatherSecondaryMetricsRow, {
      props: {
        weather: buildCurrentWeatherView({ visibilityM: 3200 }),
      },
    })
    expect(kmWrapper.text()).toContain('3.2 km')

    const mWrapper = mount(WeatherSecondaryMetricsRow, {
      props: {
        weather: buildCurrentWeatherView({ visibilityM: 250 }),
      },
    })
    expect(mWrapper.text()).toContain('250 m')

    const dashWrapper = mount(WeatherSecondaryMetricsRow, {
      props: {
        weather: buildCurrentWeatherView({ visibilityM: 0 }),
      },
    })
    expect(dashWrapper.text()).toContain('—')
  })

  it('WeatherForecastStrip keeps details action disabled (red path)', () => {
    const wrapper = mount(WeatherForecastStrip)
    const button = wrapper.get('button')

    expect(wrapper.text()).toContain('Previsão para 5 dias')
    expect(button.attributes('disabled')).toBeDefined()
    expect(button.attributes('title')).toContain('Disponível em breve')
  })

  it('WeatherCurrentCard renders classic weather summary layout', () => {
    const wrapper = mount(WeatherCurrentCard, {
      props: {
        weather: buildCurrentWeatherView({
          visibilityM: 1500,
          locationLabel: 'Maceió, AL, BR',
        }),
      },
    })

    expect(wrapper.text()).toContain('Maceió, AL, BR')
    expect(wrapper.text()).toContain('Umidade')
    expect(wrapper.text()).toContain('Sensação')
    expect(wrapper.text()).toContain('1.5 km')
  })
})
