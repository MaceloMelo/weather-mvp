<script setup lang="ts">
import DsGlassCard from '../ds/DsGlassCard.vue'

withDefaults(
  defineProps<{
    icon: string
    iconTone?: 'primary' | 'secondary' | 'tertiary'
    label: string
    value: string
  }>(),
  {
    iconTone: 'primary',
  },
)

const toneClass: Record<string, string> = {
  primary: 'text-atmos-primary',
  secondary: 'text-atmos-secondary',
  tertiary: 'text-atmos-tertiary',
}
</script>

<template>
  <DsGlassCard
    class="rounded-[32px] p-atmos-lg text-center transition duration-500 hover:bg-white/10"
  >
    <div
      class="flex flex-col items-center gap-atmos-sm"
    >
      <span
        class="material-symbols-outlined mb-atmos-sm text-3xl leading-none"
        :class="toneClass[iconTone]"
        aria-hidden="true"
      >{{ icon }}</span>
      <span
        class="text-atmos-label-caps uppercase text-white/50"
      >{{ label }}</span>
      <span
        class="text-atmos-headline-md text-white"
      >{{ value }}</span>
    </div>
  </DsGlassCard>
</template>
