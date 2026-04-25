import type { Component } from 'vue'
import { mount } from '@vue/test-utils'
import type { MountingOptions, VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from './pinia'

type GenericProps = Record<string, unknown>

export function mountWithPinia<T extends Component>(
  component: T,
  options: MountingOptions<GenericProps> = {},
): VueWrapper {
  const pinia = createTestingPinia()

  return mount(component, {
    ...options,
    global: {
      stubs: {
        transition: false,
        ...options.global?.stubs,
      },
      plugins: [pinia, ...(options.global?.plugins || [])],
      ...options.global,
    },
  })
}
