import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsAmbientBackground from '../../src/components/ds/DsAmbientBackground.vue'
import DsBottomNav from '../../src/components/ds/DsBottomNav.vue'
import DsButton from '../../src/components/ds/DsButton.vue'
import DsGlassCard from '../../src/components/ds/DsGlassCard.vue'
import DsTopAppBar from '../../src/components/ds/DsTopAppBar.vue'

describe('ds components', () => {
  it('DsButton applies variant class and forwards disabled/type contract', () => {
    const wrapper = mount(DsButton, {
      props: {
        variant: 'secondary',
        disabled: true,
        type: 'submit',
      },
      slots: {
        default: 'Buscar',
      },
    })

    const button = wrapper.get('button')
    expect(button.attributes('type')).toBe('submit')
    expect(button.attributes('disabled')).toBeDefined()
    expect(button.classes().join(' ')).toContain('border')
    expect(wrapper.text()).toContain('Buscar')
  })

  it('DsGlassCard toggles elevated class by prop', () => {
    const wrapper = mount(DsGlassCard, {
      props: { elevated: true },
      slots: { default: '<p>Conteúdo</p>' },
    })

    expect(wrapper.attributes('data-ds')).toBe('glass-card')
    expect(wrapper.classes()).toContain('atmos-glass-panel--elevated')
  })

  it('DsTopAppBar renders slot and emits icon actions', async () => {
    const wrapper = mount(DsTopAppBar, {
      props: { brand: 'Sky' },
      slots: {
        nav: '<button type="button">Home</button>',
      },
    })

    expect(wrapper.text()).toContain('Sky')
    expect(wrapper.text()).toContain('Home')

    await wrapper.get('button[aria-label="Localização"]').trigger('click')
    await wrapper.get('button[aria-label="Configurações"]').trigger('click')

    expect(wrapper.emitted('location-click')).toHaveLength(1)
    expect(wrapper.emitted('settings-click')).toHaveLength(1)
  })

  it('DsBottomNav marks active item and emits navigation event', async () => {
    const wrapper = mount(DsBottomNav, {
      props: {
        activeId: 'forecast',
      },
    })

    const navButtons = wrapper.findAll('button')
    const active = navButtons.find((btn) => btn.attributes('aria-current') === 'page')

    expect(active?.text()).toContain('Previsão')
    await navButtons[2].trigger('click')
    expect(wrapper.emitted('navigate')?.[0]).toEqual(['radar'])
  })

  it('DsAmbientBackground maps variant class and optional image contract', () => {
    const wrapper = mount(DsAmbientBackground, {
      props: {
        variant: 'rainy',
        imageUrl: '/ambient/rain.png',
        alt: 'Fundo chuvoso',
      },
    })

    expect(wrapper.find('.bg-atmos-shell-rainy').exists()).toBe(true)
    const img = wrapper.get('img')
    expect(img.attributes('src')).toBe('/ambient/rain.png')
    expect(img.attributes('alt')).toBe('Fundo chuvoso')
  })
})
