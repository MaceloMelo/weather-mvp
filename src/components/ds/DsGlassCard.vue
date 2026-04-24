<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Superfície com blur e opacidade um pouco maior (Atmos: camadas ativas). */
    elevated?: boolean
  }>(),
  { elevated: false },
)
</script>

<template>
  <div
    :class="elevated ? 'atmos-glass-panel--elevated' : 'atmos-glass-panel'"
    data-ds="glass-card"
  >
    <slot />
  </div>
</template>
