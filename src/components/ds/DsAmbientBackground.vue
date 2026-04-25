<script setup lang="ts">
import type { AmbientWeatherKind } from '../../types/weather'

const props = withDefaults(
  defineProps<{
    /** URL opcional de imagem (ex.: arquivo em `public/`). Se vazio, só gradiente Atmos + overlay. */
    imageUrl?: string
    alt?: string
    /**
     * Variante de gradiente conforme condição meteorológica (Stitch: mesma estrutura de tela, só o fundo muda).
     * @see docs/micro-tasks/07-weather-ambient-backgrounds.md
     */
    variant?: AmbientWeatherKind
  }>(),
  {
    imageUrl: '',
    alt: '',
    variant: 'default',
  },
)

const shellClassByVariant: Record<AmbientWeatherKind, string> = {
  default: 'bg-atmos-shell',
  sunny: 'bg-atmos-shell-sunny',
  cloudy: 'bg-atmos-shell-cloudy',
  rainy: 'bg-atmos-shell-rainy',
}
</script>

<template>
  <div
    class="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    aria-hidden="true"
  >
    <div
      class="absolute inset-0 bg-fixed"
      :class="shellClassByVariant[props.variant]"
    />
    <img
      v-if="imageUrl"
      class="absolute inset-0 h-full w-full scale-110 object-cover"
      :src="imageUrl"
      :alt="alt || undefined"
    >
    <div
      class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-atmos-background/80"
    />
  </div>
</template>
