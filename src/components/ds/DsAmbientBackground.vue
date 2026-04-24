<script setup lang="ts">
withDefaults(
  defineProps<{
    /** URL opcional de imagem (ex.: arquivo em `public/`). Se vazio, só gradiente Atmos + overlay. */
    imageUrl?: string
    alt?: string
  }>(),
  {
    imageUrl: '',
    alt: '',
  },
)
</script>

<template>
  <div
    class="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    aria-hidden="true"
  >
    <div
      class="absolute inset-0 bg-atmos-shell bg-fixed"
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
