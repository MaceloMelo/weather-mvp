import { createPinia, setActivePinia } from 'pinia'
import type { Pinia } from 'pinia'

export function createTestingPinia(): Pinia {
  const pinia = createPinia()
  setActivePinia(pinia)
  return pinia
}
